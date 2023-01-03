# FruitFont Editor

A visual editor for Adafruit GFX Fonts. Generates C code.

## Reference

[Source](https://adafruit.github.io/Adafruit-GFX-Library/html/struct_g_f_xfont.html)

- The GFXfont struct consists of:
  - uint8_t* bitmap, a pointer to the glyph data
  - GFXglyph* glyph, an array of glyph structs
  - uint16_t's first and last (ascii codes)
  - uint8_t yAdvance (line height)

- The GFXglyph struct consists of:
  - uint16_t bitmapOffset, a *byte* position within bitmapOffset
  - uint8_t's width, height and xAdvance (glyph width)
  - int8_t's xOffset and yOffset to position the glyph

For a certain width and height, width × height _bits_ starting at _byte_ bitmapOffset are used to paint the glyph. The bits represents pixels from the top left corner; left-to-right then top-to-bottom.

## Todo

This list is in no particular order:

- Compress the bitmap by identifying overlap
- Support multiple variants of a font (sizes and styles)
- Refactor: Replace {x|y}{min|max} with canvas height/width
- Auto-generate canvas dimensions from ystep (line height)
- Show auto-generate and show top/left/bottom guides
- Manual xstep (glyph width) for monospace and proportional
- Import GFXfont .h files
- Preview widget
- Onionskin display
- Sharper glyph tray previews by snapping to integer scales
- Fill gaps while drawing quickly