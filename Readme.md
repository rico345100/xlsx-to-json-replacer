# XLSX To JSON Replacer
## How does it work?
First, the program reads each k/v pair from the source xlsx file.
And K/V pair must be look like this:

| Cell1             | Cell2                            |
|-------------------|----------------------------------|
| equipment.glock17 | A modern fancy automatic pistol. |
| mainView.play     | Play!                            |

Then it opens the source JSON object, and finds corresponding object property, and overwrites the value of the property from the xlsx file.

For instance, if the original JSON looks like this:

```json
{
    "equipment": {
        "glock17": "It's a cool weapon, dude."
    },
    "mainView": {
        "play": "Spielen"
    }
}
```

The output JSON looks like this:

```json
{
    "equipment": {
        "glock17": "A modern fancty automatic pistol."
    },
    "mainView": {
        "play": "Play!"
    }
}
```

## Getting Started
1. Get Node.js

2. Install Deps

```bash
$ npm install
```

3. Prepare files and run

```bash
$ node replace -i source.json -x source.xlsx -o result.json
```

## Available Parameters
-i: Specify input JSON directory. Must be specified.
-x: Specify input XLSX directory. Must be specified.
-o: Optional output directory. Default is result.json

## Known issues
If you save the google spread as xlsx, the blank rows also included in your downloaded xlsx file. This program will stop the iteration once it's the empty string.

# License
MIT. Do whatever you want. You can feel free to make PR if you want to improve or fixed a bug.

# Dotation Link Test
Press below button to donate my project!

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PVXTU5FJNBLDS)
