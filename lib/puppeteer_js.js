/**
 * Puppeteer GSAP Animation Recorder
 *
 * This script records GSAP animations with perfect frame rate and quality
 * by controlling the timeline programmatically.
 *
 * Usage:
 *   yarn record              - Standard quality recording (60fps)
 *   yarn record:hq           - High quality recording (slower encoding)
 *   yarn record:frames       - Export individual frames (for After Effects)
 *
 * Custom URL:
 *   node lib/puppeteer_js.js --url=https://yoursite.com
 *   node lib/puppeteer_js.js --url=https://yoursite.com --quality high
 *   node lib/puppeteer_js.js --url=https://yoursite.com --frames
 */

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
const path = require('path');

// ============ CONFIGURATION ============
const CONFIG = {
  // Your local dev server URL
  url: 'http://localhost:5173',  // Vite default port

  // Recording settings
  fps: 60,

  // Browser viewport size (should be larger than clip region)
  viewportWidth: 1920,
  viewportHeight: 1600,  // Taller to accommodate offset recordings

  // Clip region (the area you want to record)
  // Examples:
  //   Top of page:     { x: 0, y: 0, width: 1440, height: 800 }
  //   800px down:      { x: 0, y: 800, width: 1440, height: 800 }
  //   1600px down:     { x: 0, y: 1600, width: 1440, height: 800 }
  //   Offset from left: { x: 240, y: 0, width: 1440, height: 800 }
  clip: {
    x: 0,        // X offset from left
    y: 0,        // Y offset from top (change to 800 to record 800px down)
    width: 1440,  // Recording width
    height: 800   // Recording height
  },

  // Duration to record (in seconds)
  // This should cover your entire banner animation
  duration: 5,  // Adjust based on your animation length

  // Output settings
  outputDir: './recordings',
  framesDir: './recordings/frames',

  // Video quality settings
  qualityPresets: {
    standard: {
      videoCrf: 18,      // 0-51, lower = better quality
      videoPreset: 'medium',
      videoBitrate: 8000
    },
    high: {
      videoCrf: 15,
      videoPreset: 'slow',
      videoBitrate: 12000
    }
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const isHighQuality = args.includes('--quality') && args.includes('high');
const isFrameMode = args.includes('--frames');
const quality = isHighQuality ? 'high' : 'standard';

// Check if a custom URL was provided
const urlArgIndex = args.findIndex(arg => arg.startsWith('--url='));
if (urlArgIndex !== -1) {
  CONFIG.url = args[urlArgIndex].split('=')[1];
}

// ============ UTILITY FUNCTIONS ============

function createOutputDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
}

function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
}

// Helper function to replace deprecated page.waitForTimeout
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============ RECORDING METHODS ============

/**
 * Method 1: Direct Video Recording
 * Records the browser window directly to MP4
 */
async function recordDirectVideo(page) {
  console.log('\n📹 Starting direct video recording...');
  console.log(`Quality: ${quality}`);
  console.log(`FPS: ${CONFIG.fps}`);
  console.log(`Duration: ${CONFIG.duration}s`);
  console.log(`Clip region: ${CONFIG.clip.width}x${CONFIG.clip.height} at (${CONFIG.clip.x}, ${CONFIG.clip.y})\n`);

  const timestamp = getTimestamp();
  const outputPath = path.join(CONFIG.outputDir, `animation-${timestamp}.mp4`);

  const recorder = new PuppeteerScreenRecorder(page, {
    fps: CONFIG.fps,
    videoFrame: {
      width: CONFIG.clip.width,
      height: CONFIG.clip.height
    },
    aspectRatio: '16:9',
    ...CONFIG.qualityPresets[quality]
  });

  await recorder.start(outputPath);
  console.log('🎬 Recording started...');

  // Wait for animation to complete
  await delay(CONFIG.duration * 1000);

  await recorder.stop();
  console.log(`\n✅ Recording complete: ${outputPath}`);

  return outputPath;
}

/**
 * Method 2: Frame-by-Frame Capture
 * Captures individual PNG frames for perfect quality
 * Can be imported into After Effects or stitched with ffmpeg
 */
async function recordFrameByFrame(page) {
  console.log('\n📸 Starting frame-by-frame capture...');
  console.log(`FPS: ${CONFIG.fps}`);
  console.log(`Duration: ${CONFIG.duration}s`);
  console.log(`Clip region: ${CONFIG.clip.width}x${CONFIG.clip.height} at (${CONFIG.clip.x}, ${CONFIG.clip.y})`);

  const timestamp = getTimestamp();
  const framesDir = path.join(CONFIG.framesDir, `capture-${timestamp}`);
  createOutputDir(framesDir);

  const totalFrames = CONFIG.fps * CONFIG.duration;
  const frameTime = 1 / CONFIG.fps;

  console.log(`Total frames: ${totalFrames}\n`);

  // Wait for the timeline to be ready
  await page.waitForFunction(() => window.sct_banner_tl !== undefined);

  for (let frame = 0; frame < totalFrames; frame++) {
    const currentTime = frame * frameTime;

    // Seek to specific time in timeline
    await page.evaluate((time) => {
      if (window.sct_banner_tl) {
        window.sct_banner_tl.pause();
        window.sct_banner_tl.seek(time);
      }
    }, currentTime);

    // Wait for frame to render
    await delay(50);

    // Capture frame with clip region
    const framePath = path.join(framesDir, `frame-${String(frame).padStart(5, '0')}.png`);
    await page.screenshot({
      path: framePath,
      clip: {
        x: CONFIG.clip.x,
        y: CONFIG.clip.y,
        width: CONFIG.clip.width,
        height: CONFIG.clip.height
      }
    });

    // Progress indicator
    if ((frame + 1) % 30 === 0 || frame === totalFrames - 1) {
      const progress = ((frame + 1) / totalFrames * 100).toFixed(1);
      console.log(`Progress: ${progress}% (${frame + 1}/${totalFrames} frames)`);
    }
  }

  console.log(`\n✅ Frames saved to: ${framesDir}`);
  console.log('\nTo create video with ffmpeg, run:');
  console.log(`ffmpeg -framerate ${CONFIG.fps} -i "${framesDir}/frame-%05d.png" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p "${framesDir}/output.mp4"`);

  return framesDir;
}

/**
 * Method 3: Controlled Timeline Recording
 * Manually steps through GSAP timeline for maximum control
 */
async function recordWithTimelineControl(page) {
  console.log('\n⏱️  Starting timeline-controlled recording...');
  console.log(`Clip region: ${CONFIG.clip.width}x${CONFIG.clip.height} at (${CONFIG.clip.x}, ${CONFIG.clip.y})`);

  const timestamp = getTimestamp();
  const outputPath = path.join(CONFIG.outputDir, `timeline-${timestamp}.mp4`);

  // Wait for timeline to be exposed
  await page.waitForFunction(() => window.sct_banner_tl !== undefined);

  // Pause the timeline so we can control it
  await page.evaluate(() => {
    if (window.sct_banner_tl) {
      window.sct_banner_tl.pause();
      window.sct_banner_tl.seek(0);
    }
  });

  console.log('Timeline paused and ready for recording');

  const recorder = new PuppeteerScreenRecorder(page, {
    fps: CONFIG.fps,
    videoFrame: {
      width: CONFIG.clip.width,
      height: CONFIG.clip.height
    },
    aspectRatio: '16:9',
    ...CONFIG.qualityPresets[quality]
  });

  await recorder.start(outputPath);
  console.log('🎬 Recording started...');

  // Play the timeline
  await page.evaluate(() => {
    if (window.sct_banner_tl) {
      window.sct_banner_tl.play();
    }
  });

  // Wait for animation
  await delay(CONFIG.duration * 1000);

  await recorder.stop();
  console.log(`\n✅ Recording complete: ${outputPath}`);

  return outputPath;
}

// ============ MAIN FUNCTION ============

async function recordAnimation() {
  console.log('\n=================================');
  console.log('  GSAP Animation Recorder');
  console.log('=================================');

  createOutputDir(CONFIG.outputDir);

  // Launch browser
  console.log('\n🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: false,  // Set to true for background recording
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: CONFIG.viewportWidth,
    height: CONFIG.viewportHeight,
    deviceScaleFactor: 1
  });

  console.log(`📍 Navigating to ${CONFIG.url}...`);

  try {
    await page.goto(CONFIG.url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    console.log('✓ Page loaded');

    // Wait for animations to be ready
    console.log('⏳ Waiting for animations to initialize...');
    await delay(1000);

    // Choose recording method based on flags
    if (isFrameMode) {
      await recordFrameByFrame(page);
    } else {
      // Check if timeline is exposed for controlled recording
      const hasTimeline = await page.evaluate(() => window.sct_banner_tl !== undefined);

      if (hasTimeline) {
        await recordWithTimelineControl(page);
      } else {
        await recordDirectVideo(page);
      }
    }

  } catch (error) {
    console.error('\n❌ Error during recording:', error.message);

    if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
      console.error('\n💡 Make sure your dev server is running!');
      console.error('   Run "yarn dev" in another terminal first.');
    }
  } finally {
    await browser.close();
    console.log('\n✨ Done!\n');
  }
}

// ============ RUN ============

recordAnimation().catch(console.error);
