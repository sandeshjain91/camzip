# CamZip v2

This version includes:
- Auto-suggest session folder name with cursor before date (type prefix then date)
- Numbered filenames inside the ZIP: 1.jpg, 2.jpg, ...
- Auto-opens camera when session starts
- Retake and Delete options for each photo
- "Save to Files" button that attempts to open the native Share Sheet on mobile (uses Web Share API if available)
- iOS-styled blue buttons (#007AFF)

## Deploy on GitHub Pages
1. Upload all files from this package to the root of your repo (not in a subfolder).
2. In GitHub repo: Settings → Pages → Source → main branch / root → Save.
3. Wait a minute and open `https://yourusername.github.io/reponame/` and test on your phone.

## Notes on iOS
- Safari will show the Save-to-Files UI when you tap the Save to Files button (if Web Share is available it will present options).
- If your browser doesn't support the Web Share API with files, the button falls back to a direct download.

