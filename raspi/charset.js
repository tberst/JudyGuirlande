//cf http://35007.de/chargenerator.htm


var GPIO_to_SEGMENT ={
    'A1' : 4,
    'A2' : 17,
    'B' : 13,
    'D1' : 20,
    'E' : 23,
    'F' : 27,
    'G1' : 19,
    'G2' : 26,
    'H' : 22,
    'I' : 5,
    'J' : 6,
    'K' : 24,
    'L' : 25,
    'M' : 12,
    'C' : 16,
    'D2' : 21,
    'DP' : 19
}

var charset = {
    U25F0: ['A1','A2','B','C','D1','D2','E','F','G1','I'], // ◰ WHITE SQUARE WITH UPPER LEFT QUADRANT
    U25F1: ['A1','A2','B','C','D1','D2','E','F','G1','L'], // ◱ WHITE SQUARE WITH LOWER LEFT QUADRANT
    U25F2: ['A1','A2','B','C','D1','D2','E','F','G2','L'], // ◲ WHITE SQUARE WITH LOWER RIGHT QUADRANT
    U25F3: ['A1','A2','B','C','D1','D2','E','F','G2','I'], // ◳ WHITE SQUARE WITH UPPER RIGHT QUADRANT
    U25EB: ['A1','A2','B','C','D1','D2','E','F','I','L'], // ◫ WHITE SQUARE WITH VERTICAL BISECTING LINE
    U25E8: ['A1','A2','B','C','D1','D2','E','F','G2','I','J','L','M'], // ◨ SQUARE WITH RIGHT HALF BLACK
    U25E7: ['A1','A2','B','C','D1','D2','E','F','G1','H','I','K','L'], // ◧ SQUARE WITH LEFT HALF BLACK
    U25E9: ['A1','A2','B','C','D1','D2','E','F','G1','H','I','J','K'], // ◩ SQUARE WITH UPPER LEFT DIAGONAL HALF BLACK
    U25EA: ['A1','A2','B','C','D1','D2','E','F','G2','J','K','L','M'], // ◪ SQUARE WITH LOWER RIGHT DIAGONAL HALF BLACK
    U2B12: ['A1','A2','B','C','D1','D2','E','F','G1','G2','K','L','M'], // ⬒ SQUARE WITH TOP HALF BLACK
    U2B13: ['A1','A2','B','C','D1','D2','E','F','G1','G2','H','I','J'], // ⬓ SQUARE WITH BOTTOM HALF BLACK
    U25FF: ['B','C','D1','D2','J','K'], // ◿ LOWER RIGHT TRIANGLE
    U25AA: ['D1','D2','E','F','H','M'], // ▪ BLACK SMALL SQUARE
    U25F8: ['A1','A2','E','F','J','K'], // ◸ UPPER LEFT TRIANGLE
    U25F9: ['A1','A2','B','C','H','M'], // ◹ UPPER RIGHT TRIANGLE
    U25B6: ['E','F','G1','H','K'], // ▶ BLACK RIGHT-POINTING TRIANGLE
    U25C0: ['B','C','G2','J','M'], // ◀ BLACK LEFT-POINTING TRIANGLE
    U2195: ['H','I','J','K','L','M'], // ↕ UP DOWN ARROW
    U203C: ['B','C','I','L','DP'], // ‼ DOUBLE EXCLAMATION MARK
    U00B6: ['A1','A2','B','C','F','G1','G2','I','L'], // ¶ PILCROW SIGN
    U00A7: ['A1','A2','C','D1','D2','F','G1','G2','H','M'], // § SECTION SIGN
    U25AC: ['C','D1','D2','E','G1','G2','K','L','M'], // ▬ BLACK RECTANGLE
    U21A8: ['D1','D2','H','I','J','K','L','M'], // ↨ UP DOWN ARROW WITH BASE
    U2191: ['K','L','M'], // ↑ UPWARDS ARROW
    U2193: ['H','I','J'], // ↓ DOWNWARDS ARROW
    U2192: ['G1','H','K'], // → RIGHTWARDS ARROW
    U2190: ['G2','J','M'], // ← LEFTWARDS ARROW
    U221F: ['D1','D2','E'], // ∟ RIGHT ANGLE
    U2194: ['G1','G2','H','J','K','M'], // ↔ LEFT RIGHT ARROW
    U25B2: ['D1','D2','K','L','M'], // ▲ BLACK UP-POINTING TRIANGLE
    U25BC: ['A1','A2','H','I','J'], // ▼ BLACK DOWN-POINTING TRIANGLE
    U0020: [], //   SPACE
    U0021: ['B','C','DP'], // ! EXCLAMATION MARK
    U0022: ['B','F'], // &quot; QUOTATION MARK
    U0023: ['D1','D2','E','F','G1','G2','I','L'], // # NUMBER SIGN
    U0024: ['A1','A2','C','D1','D2','F','G1','G2','I','L'], // $ DOLLAR SIGN
    U0025: ['A1','C','D2','F','G1','G2','I','J','K','L'], // % PERCENT SIGN
    U0026: ['A1','D1','D2','E','F','G1','H','J','M'], // & AMPERSAND
    U0027: ['B'], // &apos; APOSTROPHE
    U0028: ['J','M'], // ( LEFT PARENTHESIS
    U0029: ['H','K'], // ) RIGHT PARENTHESIS
    U002A: ['G1','G2','H','I','J','K','L','M'], // * ASTERISK
    U002B: ['G1','G2','I','L'], // + PLUS SIGN
    U002C: ['D1'], // , COMMA
    U002D: ['G1','G2'], // - HYPHEN-MINUS
    U002E: ['DP'], // . FULL STOP
    U002F: ['J','K'], // / SOLIDUS
    U0030: ['A1','A2','B','C','D1','D2','E','F','J','K'], // 0 DIGIT ZERO
    U0031: ['B','C'], // 1 DIGIT ONE
    U0032: ['A1','A2','B','D1','D2','E','G1','G2'], // 2 DIGIT TWO
    U0033: ['A1','A2','B','C','D1','D2','G1','G2'], // 3 DIGIT THREE
    U0034: ['B','C','F','G1','G2'], // 4 DIGIT FOUR
    U0035: ['A1','A2','C','D1','D2','F','G1','G2'], // 5 DIGIT FIVE
    U0036: ['A1','A2','C','D1','D2','E','F','G1','G2'], // 6 DIGIT SIX
    U0037: ['A1','A2','B','C'], // 7 DIGIT SEVEN
    U0038: ['A1','A2','B','C','D1','D2','E','F','G1','G2'], // 8 DIGIT EIGHT
    U0039: ['A1','A2','B','C','D1','D2','F','G1','G2'], // 9 DIGIT NINE
    U003A: ['G1','D1'], // : COLON
    U003B: ['A1','K'], // ; SEMICOLON
    U003C: ['J','M'], // < LESS-THAN SIGN
    U003D: ['D1','D2','G1','G2'], // = EQUALS SIGN
    U003E: ['H','K'], // > GREATER-THAN SIGN
    U003F: ['A2','B','G2','L','DP'], // ? QUESTION MARK
    U0040: ['A1','A2','B','C','D1','D2','E','G1','L'], // @ COMMERCIAL AT
    U0041: ['A1','A2','B','C','E','F','G1','G2'], // A LATIN CAPITAL LETTER A
    U0042: ['A1','A2','B','C','D1','D2','G2','I','L'], // B LATIN CAPITAL LETTER B
    U0043: ['A1','A2','D1','D2','E','F'], // C LATIN CAPITAL LETTER C
    U0044: ['A1','A2','B','C','D1','D2','I','L'], // D LATIN CAPITAL LETTER D
    U0045: ['A1','A2','D1','D2','E','F','G1'], // E LATIN CAPITAL LETTER E
    U0046: ['A1','A2','E','F','G1'], // F LATIN CAPITAL LETTER F
    U0047: ['A1','A2','C','D1','D2','E','F','G2'], // G LATIN CAPITAL LETTER G
    U0048: ['B','C','E','F','G1','G2'], // H LATIN CAPITAL LETTER H
    U0049: ['A1','A2','D1','D2','I','L'], // I LATIN CAPITAL LETTER I
    U004A: ['B','C','D1','D2','E'], // J LATIN CAPITAL LETTER J
    U004B: ['E','F','G1','J','M'], // K LATIN CAPITAL LETTER K
    U004C: ['D1','D2','E','F'], // L LATIN CAPITAL LETTER L
    U004D: ['B','C','E','F','H','J'], // M LATIN CAPITAL LETTER M
    U004E: ['B','C','E','F','H','M'], // N LATIN CAPITAL LETTER N
    U004F: ['A1','A2','B','C','D1','D2','E','F'], // O LATIN CAPITAL LETTER O
    U0050: ['A1','A2','B','E','F','G1','G2'], // P LATIN CAPITAL LETTER P
    U0051: ['A1','A2','B','C','D1','D2','E','F','M'], // Q LATIN CAPITAL LETTER Q
    U0052: ['A1','A2','B','E','F','G1','G2','M'], // R LATIN CAPITAL LETTER R
    U0053: ['A1','A2','C','D1','D2','F','G1','G2'], // S LATIN CAPITAL LETTER S
    U0054: ['A1','A2','I','L'], // T LATIN CAPITAL LETTER T
    U0055: ['B','C','D1','D2','E','F'], // U LATIN CAPITAL LETTER U
    U0056: ['E','F','J','K'], // V LATIN CAPITAL LETTER V
    U0057: ['B','C','E','F','K','M'], // W LATIN CAPITAL LETTER W
    U0058: ['H','J','K','M'], // X LATIN CAPITAL LETTER X
    U0059: ['H','J','L'], // Y LATIN CAPITAL LETTER Y
    U005A: ['A1','A2','D1','D2','J','K'], // Z LATIN CAPITAL LETTER Z
    U005B: ['A2','D2','I','L'], // [ LEFT SQUARE BRACKET
    U005C: ['H','M'], // \ REVERSE SOLIDUS
    U005D: ['A1','D1','I','L'], // ] RIGHT SQUARE BRACKET
    U005E: ['K','M'], // ^ CIRCUMFLEX ACCENT
    U005F: ['D1','D2'], // _ LOW LINE
    U0060: ['H'], // ` GRAVE ACCENT
    U0061: ['D1','D2','E','G1','L'], // a LATIN SMALL LETTER A
    U0062: ['C','D1','D2','E','F','G1','G2'], // b LATIN SMALL LETTER B
    U0063: ['D1','D2','E','G1','G2'], // c LATIN SMALL LETTER C
    U0064: ['B','C','D1','D2','E','G1','G2'], // d LATIN SMALL LETTER D
    U0065: ['D1','D2','E','G1','K'], // e LATIN SMALL LETTER E
    U0066: ['A2','G1','G2','I','L'], // f LATIN SMALL LETTER F
    U0067: ['D2','E','G1','K','M'], // g LATIN SMALL LETTER G
    U0068: ['C','E','F','G1','G2'], // h LATIN SMALL LETTER H
    U0069: ['A1','D1','D2','G1','L'], // i LATIN SMALL LETTER I
    U006A: ['A2','C','D1','D2','G2'], // j LATIN SMALL LETTER J
    U006B: ['E','F','G1','G2','M'], // k LATIN SMALL LETTER K
    U006C: ['A1','D2','I','L'], // l LATIN SMALL LETTER L
    U006D: ['C','E','G1','G2','L'], // m LATIN SMALL LETTER M
    U006E: ['C','E','G1','G2'], // n LATIN SMALL LETTER N
    U006F: ['C','D1','D2','E','G1','G2'], // o LATIN SMALL LETTER O
    U0070: ['C','D1','G2','L','M'], // p LATIN SMALL LETTER P
    U0071: ['C','D1','D2','E','G1','G2','M'], // q LATIN SMALL LETTER Q
    U0072: ['E','G1','G2'], // r LATIN SMALL LETTER R
    U0073: ['D1','D2','G2','M'], // s LATIN SMALL LETTER S
    U0074: ['D2','G1','G2','I','L'], // t LATIN SMALL LETTER T
    U0075: ['C','D1','D2','E'], // u LATIN SMALL LETTER U
    U0076: ['E','K'], // v LATIN SMALL LETTER V
    U0077: ['C','E','K','M'], // w LATIN SMALL LETTER W
    U0078: ['G1','G2','K','M'], // x LATIN SMALL LETTER X
    U0079: ['C','D1','D2','M'], // y LATIN SMALL LETTER Y
    U007A: ['D1','G1','K'], // z LATIN SMALL LETTER Z
    U007B: ['A2','D2','G1','I','L'], // { LEFT CURLY BRACKET
    U007C: ['I','L'], // | VERTICAL LINE
    U007D: ['A1','D1','G2','I','L'], // } RIGHT CURLY BRACKET
    U007E: ['F','H','J'], // ~ TILDE
    U2302: ['D1','D2','K','M'], // ⌂ HOUSE
    U0308: ['C','E'], // ̈ COMBINING DIAERESIS
    U00E6: ['A2','B','D1','E','G1','G2','H','I','L','M'], // æ LATIN SMALL LETTER AE
    U29D6: ['A1','A2','D1','D2','H','I','J','K','M'], // ⧖ WHITE HOURGLASS
    U29D7: ['A1','A2','D1','D2','H','J','K','L','M'], // ⧗ BLACK HOURGLASS
    U20AC: ['A1','D1','E','F','G1','J','M'], // € EURO SIGN
    U201C: ['C','L'], // “ LEFT DOUBLE QUOTATION MARK
    U201D: ['F','I'], // ” RIGHT DOUBLE QUOTATION MARK
    U00B4: ['J'], // ´ ACUTE ACCENT
    U00C6: ['A1','A2','D2','E','F','G1','G2','I','L'], // Æ LATIN CAPITAL LETTER AE
    U2310: ['A1','A2','F'], // ⌐ REVERSED NOT SIGN
    U00AC: ['A1','A2','B'], // ¬ NOT SIGN
    U00A2: ['A1','A2','D1','D2','E','F','I','L'], // ¢ CENT SIGN
    U00A3: ['A2','D1','D2','G1','G2','I','L'], // £ POUND SIGN
    U00A5: ['G1','G2','H','J','L'], // ¥ YEN SIGN
    U20A7: ['A1','D2','E','F','G1','G2','I','L','M'], // ₧ PESETA SIGN
    U0192: ['A2','D1','G1','G2','I','L'], // ƒ LATIN SMALL LETTER F WITH HOOK
    U2596: ['D1','E','G1','K','L'], // ▖ QUADRANT LOWER LEFT
    U2597: ['C','D2','G2','L','M'], // ▗ QUADRANT LOWER RIGHT
    U2598: ['A1','F','G1','H','I'], // ▘ QUADRANT UPPER LEFT
    U2599: ['A1','C','D1','D2','E','F','G1','G2','H','I','K','L','M'], // ▙ QUADRANT UPPER LEFT AND LOWER LEFT AND LOWER RIGHT
    U259A: ['A1','C','D2','F','G1','G2','H','I','L','M'], // ▚ QUADRANT UPPER LEFT AND LOWER RIGHT
    U259B: ['A1','A2','B','D1','E','F','G1','G2','H','I','J','K','L'], // ▛ QUADRANT UPPER LEFT AND UPPER RIGHT AND LOWER LEFT
    U259C: ['A1','A2','B','C','D2','F','G1','G2','H','I','J','L','M'], // ▜ QUADRANT UPPER LEFT AND UPPER RIGHT AND LOWER RIGHT
    U259D: ['A2','B','G2','I','J'], // ▝ QUADRANT UPPER RIGHT
    U259E: ['A2','B','D1','E','G1','I','G2','J','K','L'], // ▞ QUADRANT UPPER RIGHT AND LOWER LEFT
    U259F: ['A2','B','C','D1','D2','E','G1','G2','I','J','K','L','M'], // ▟ QUADRANT UPPER RIGHT AND LOWER LEFT AND LOWER RIGHT
    U25A4: ['A1','A2','D1','D2','G1','G2'], // ▤ SQUARE WITH HORIZONTAL FILL
    U25B5: ['B','C','E','F','I','L'], // ▵ WHITE UP-POINTING SMALL TRIANGLE
    U25A6: ['A1','A2','B','C','D1','D2','E','F','G1','G2','I','L'], // ▦ SQUARE WITH ORTHOGONAL CROSSHATCH FILL
    U25A7: ['A2','B','D1','E','H','M'], // ▧ SQUARE WITH UPPER LEFT TO LOWER RIGHT FILL
    U25A8: ['A1','C','D2','F','J','K'], // ▨ SQUARE WITH UPPER RIGHT TO LOWER LEFT FILL
    U25A9: ['A1','A2','B','C','D1','D2','E','F','H','J','K','M'], // ▩ SQUARE WITH DIAGONAL CROSSHATCH FILL
    U2591: ['A2','D1','H','J','K','M'], // ░ LIGHT SHADE
    U2592: ['A1','A2','D1','D2','G1','G2','H','J','K','M'], // ▒ MEDIUM SHADE
    U2593: ['A1','A2','B','C','D1','D2','E','F','G1','G2','H','J','K','M'], // ▓ DARK SHADE
    U2502: ['I','L'], // │ BOX DRAWINGS LIGHT VERTICAL
    U2524: ['G1','I','L'], // ┤ BOX DRAWINGS LIGHT VERTICAL AND LEFT
    U2561: ['A1','G1','I','L'], // ╡ BOX DRAWINGS VERTICAL SINGLE AND LEFT DOUBLE
    U2562: ['B','C','E','F','G1'], // ╢ BOX DRAWINGS VERTICAL DOUBLE AND LEFT SINGLE
    U2556: ['C','G1','G2','E'], // ╖ BOX DRAWINGS DOWN DOUBLE AND LEFT SINGLE
    U2555: ['A1','G1','I','L'], // ╕ BOX DRAWINGS DOWN SINGLE AND LEFT DOUBLE
    U2563: ['B','C','E'], // ╣ BOX DRAWINGS DOUBLE VERTICAL AND LEFT
    U2551: ['B','C','E','F'], // ║ BOX DRAWINGS DOUBLE VERTICAL
    U2557: ['A1','A2','B','C','E'], // ╗ BOX DRAWINGS DOUBLE DOWN AND LEFT
    U255D: ['B','G1','G2'], // ╝ BOX DRAWINGS DOUBLE UP AND LEFT
    U255C: ['B','G1','F','G2'], // ╜ BOX DRAWINGS UP DOUBLE AND LEFT SINGLE
    U255B: ['A1','G1','I'], // ╛ BOX DRAWINGS UP SINGLE AND LEFT DOUBLE
    U2510: ['G1','L'], // ┐ BOX DRAWINGS LIGHT DOWN AND LEFT
    U2514: ['G2','I'], // └ BOX DRAWINGS LIGHT UP AND RIGHT
    U2534: ['G1','G2','I'], // ┴ BOX DRAWINGS LIGHT UP AND HORIZONTAL
    U252C: ['G1','G2','L'], // ┬ BOX DRAWINGS LIGHT DOWN AND HORIZONTAL
    U251C: ['G2','I','L'], // ├ BOX DRAWINGS LIGHT VERTICAL AND RIGHT
    U2500: ['G1','G2'], // ─ BOX DRAWINGS LIGHT HORIZONTAL
    U253C: ['G1','G2','I','L'], // ┼ BOX DRAWINGS LIGHT VERTICAL AND HORIZONTAL
    U255E: ['A2','G2','I','L'], // ╞ BOX DRAWINGS VERTICAL SINGLE AND RIGHT DOUBLE
    U255F: ['B','C','E','F','G2'], // ╟ BOX DRAWINGS VERTICAL DOUBLE AND RIGHT SINGLE
    U255A: ['F','G1','G2'], // ╚ BOX DRAWINGS DOUBLE UP AND RIGHT
    U2554: ['A1','A2','C','E','F'], // ╔ BOX DRAWINGS DOUBLE DOWN AND RIGHT
    U2569: ['G1','G2'], // ╩ BOX DRAWINGS DOUBLE UP AND HORIZONTAL
    U2566: ['A1','A2','C','E'], // ╦ BOX DRAWINGS DOUBLE DOWN AND HORIZONTAL
    U2560: ['C','E','F'], // ╠ BOX DRAWINGS DOUBLE VERTICAL AND RIGHT
    U2550: ['A1','A2','G1','G2'], // ═ BOX DRAWINGS DOUBLE HORIZONTAL
    U256C: ['C','E'], // ╬ BOX DRAWINGS DOUBLE VERTICAL AND HORIZONTAL
    U2567: ['A1','A2','G1','G2','I'], // ╧ BOX DRAWINGS UP SINGLE AND HORIZONTAL DOUBLE
    U2568: ['B','F','G1','G2'], // ╨ BOX DRAWINGS UP DOUBLE AND HORIZONTAL SINGLE
    U2564: ['A1','A2','G1','G2','L'], // ╤ BOX DRAWINGS DOWN SINGLE AND HORIZONTAL DOUBLE
    U2565: ['C','E','G1','G2'], // ╥ BOX DRAWINGS DOWN DOUBLE AND HORIZONTAL SINGLE
    U2559: ['B','F','G1','G2'], // ╙ BOX DRAWINGS UP DOUBLE AND RIGHT SINGLE
    U2558: ['A2','G2','I'], // ╘ BOX DRAWINGS UP SINGLE AND RIGHT DOUBLE
    U2552: ['A2','G2','I','L'], // ╒ BOX DRAWINGS DOWN SINGLE AND RIGHT DOUBLE
    U2553: ['C','E','G1','G2'], // ╓ BOX DRAWINGS DOWN DOUBLE AND RIGHT SINGLE
    U256B: ['B','C','E','F','G1','G2'], // ╫ BOX DRAWINGS VERTICAL DOUBLE AND HORIZONTAL SINGLE
    U256A: ['A1','A2','G1','G2','I','L'], // ╪ BOX DRAWINGS VERTICAL SINGLE AND HORIZONTAL DOUBLE
    U2518: ['G1','I'], // ┘ BOX DRAWINGS LIGHT UP AND LEFT
    U250C: ['G2','L'], // ┌ BOX DRAWINGS LIGHT DOWN AND RIGHT
    U2588: ['A1','A2','B','C','D1','D2','E','F','G1','G2','H','I','J','K','L','M'], // █ FULL BLOCK
    U2584: ['C','D1','D2','E','G1','G2','K','L','M'], // ▄ LOWER HALF BLOCK
    U258C: ['A1','D1','E','F','G1','H','I','K','L'], // ▌ LEFT HALF BLOCK
    U2590: ['A2','B','C','D2','G2','I','J','L','M'], // ▐ RIGHT HALF BLOCK
    U2580: ['A1','A2','B','F','G1','G2','H','I','J'], // ▀ UPPER HALF BLOCK
    U03B1: ['A1','D1','E','F','I','J','L','M'], // α GREEK SMALL LETTER ALPHA
    U00DF: ['A2','B','C','D2','G2','I','K'], // ß LATIN SMALL LETTER SHARP S
    U0393: ['A1','A2','E','F'], // Γ GREEK CAPITAL LETTER GAMMA
    U03C0: ['G1','G2','K','M'], // π GREEK SMALL LETTER PI
    U03A3: ['A1','A2','D1','D2','H','K'], // Σ GREEK CAPITAL LETTER SIGMA
    U03C3: ['D1','E','G1','G2','L'], // σ GREEK SMALL LETTER SIGMA
    U00B5: ['B','E','F','G1','G2'], // µ MICRO SIGN
    U03C4: ['A1','A2','I','M'], // τ GREEK SMALL LETTER TAU
    U03A6: ['A1','A2','B','C','D1','D2','E','F','I','L'], // Φ GREEK CAPITAL LETTER PHI
    U0398: ['A1','A2','B','C','D1','D2','E','F','G1','G2'], // Θ GREEK CAPITAL LETTER THETA
    U03A9: ['A1','A2','G1','G2','H','J'], // Ω GREEK CAPITAL LETTER OMEGA
    U03B4: ['A1','A2','C','D1','D2','E','G1','G2','H'], // δ GREEK SMALL LETTER DELTA
    U221E: ['B','C','E','F','H','J','K','M'], // ∞ INFINITY
    U03C6: ['A2','B','F','G1','G2','I','L'], // φ GREEK SMALL LETTER PHI
    U03B5: ['A1','D1','E','F','G1'], // ε GREEK SMALL LETTER EPSILON
    U03A0: ['A1','A2','B','C','E','F'], // Π GREEK CAPITAL LETTER PI
    U2261: ['A1','A2','D1','D2','G1','G2'], // ≡ IDENTICAL TO
    U00B1: ['D1','D2','G1','G2','I','L'], // ± PLUS-MINUS SIGN
    U2265: ['D1','D2','H','K'], // ≥ GREATER-THAN OR EQUAL TO
    U2264: ['D1','D2','J','M'], // ≤ LESS-THAN OR EQUAL TO
    U2320: ['A1','E','F','I'], // ⌠ TOP HALF INTEGRAL
    U2321: ['B','C','D2','L'], // ⌡ BOTTOM HALF INTEGRAL
    U00F7: ['A2','D2','G1','G2'], // ÷ DIVISION SIGN
    U2248: ['C','F','H','J','K','M'], // ≈ ALMOST EQUAL TO
    U00B0: ['A2','B','G2','I'], // ° DEGREE SIGN
    U221A: ['A2','B','I'], // √ SQUARE ROOT
    U207F: ['A2','G2','J'], // ⁿ SUPERSCRIPT LATIN SMALL LETTER N
    U00B2: ['E','G2','K'], // ² SUPERSCRIPT TWO
    U25A3: ['A1','A2','B','C','D1','D2','E','F','G1','G2','H','I','J','K','L','M','DP'] // ▣ WHITE SQUARE CONTAINING BLACK SMALL SQUARE
    };

    var getPinArray = function(char)
    {
        var unicode = char.charCodeAt(0).toString(16);
        var h = ("0000" + unicode).substr(-4);
        h='U'+h.toUpperCase();
        return getPins(charset[h]);
    }

    var getPins = function(segments)
    {
        var pinArray = [];
        segments.forEach(element => {
            pinArray.push(GPIO_to_SEGMENT[element]);
        })
       return pinArray;
    }
    
    exports.getPinArray = getPinArray;
    exports.getPins = getPins;
    exports.GPIO_to_SEGMENT = GPIO_to_SEGMENT;
    