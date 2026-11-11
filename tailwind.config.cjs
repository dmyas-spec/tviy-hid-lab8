module.exports = {
  "content": [
    "./index.html",
    "./confirmation.html",
    "./components/**/*.html",
    "./js/**/*.js"
  ],
  "theme": {
    "extend": {
      "colors": {
        "brand": {
          "DEFAULT": "#12664f",
          "hover": "#0d513f",
          "active": "#093d30"
        },
        "sage": "#dde9df",
        "cream": "#f6f1e7",
        "ink": "#163c32",
        "muted": "#53665f",
        "line": "#73897d",
        "accent": "#e8a23a"
      },
      "fontFamily": {
        "sans": [
          "Inter",
          "system-ui",
          "sans-serif"
        ]
      },
      "borderRadius": {
        "control": "0.75rem",
        "panel": "1.5rem"
      },
      "boxShadow": {
        "card": "0 4px 16px rgb(22 60 50 / 8%)"
      }
    }
  }
}