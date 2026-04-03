## tshet-uinh-english
JavaScript library for Qieyun called tshet-uinh-js: https://github.com/nk2028/tshet-uinh-js

- Tshet Uinh Autoderiver demo: https://nk2028.shn.hk/tshet-uinh-autoderiver/ ([GitHub repo](https://github.com/nk2028/tshet-uinh-autoderiver))
- Examples: https://github.com/nk2028/tshet-uinh-examples

## Glossary
### Core Phonological Concepts
**反切 Fanqie spelling**: The pronunciation of a character is indicated/spelled with two other characters: the first provides the initial consonant, and the second provides the rime and tone. For example, 東 is spelled as 德 + 紅.

**小韻 Xiaoyun (homophone group)**: A group of characters that were pronounced identically in Middle Chinese. Each xiaoyun represents one unique phonological position.

**音韻地位 Yinyun position (phonological position)**: The complete specification of a syllable's pronunciation in the Qieyun system using six attributes (六要素).

### 六要素 Six Phonological Attributes
**母 Initial** - The beginning consonant sound
- Examples: 幫 (p), 端 (t), 見 (k), 影 (ʔ)

**呼 (Lip) Rounding** - Whether the vowel was rounded or unrounded
- 開口: Unrounded
- 合口: Rounded
- null: Rounding-neutral (for certain rimes and labial initials)

**等 Division** - Classification for vowel quality, numbered 1-4
- 一等: Division I (back vowels)
- 二等: Division II (mid vowels)
- 三等: Division III (front vowels, palatalized)
- 四等: Division IV (high front vowels)

**類 Type** - Subdivision of Division III into A, B, C types.
- A類/B類: Front vowel types (重紐 chóngniǔ distinction)
- C類: Non-front vowel type
- Only applies to labial, velar, and laryngeal initials in Division III

**韻 Rime** - The vowel and any final consonant, including tone
- Examples: 東 (ung), 支 (je), 真 (jin)

**聲 Tone** - The pitch pattern of the syllable. Middle Chinese had 4 tones:
- 平聲: Level tone
- 上聲: Rising tone
- 去聲: Departing tone
- 入聲: Entering tone (also called checked tone, ends in a stop like -p/-t/-k)

### Higher-Level Classifications

**攝 Rime Class** - Groups of rimes with similar phonetic characteristics. 16 classes total
- Examples: 通攝 (Tong class), 止攝 (Zhi class), 蟹攝 (Xie class)

**組 Initial Group** - Groups of related initial consonants
- Examples: 幫組 (labial group), 見組 (velar group), 精組 (dental sibilant group)

**清濁 Voicing** - Whether the initial consonant was voiced or voiceless
- 全清: Fully voiceless (aspirated stops, voiceless fricatives)
- 次清: Secondarily voiceless (unaspirated stops)
- 全濁: Fully voiced (voiced stops, voiced fricatives)
- 次濁: Secondarily voiced (nasals, liquids, glides)

**韻別 Rime Type** - Classification by final consonant
- 陰聲韻: Open rimes (no final consonant)
- 陽聲韻: Nasal rimes (end in -m, -n, -ng)
- 入聲韻: Stop rimes (end in -p, -t, -k)

## Historical Sources

- **切韻 Qieyun** - The foundational rime dictionary compiled by Lu Fayan in 601 CE, representing the Middle Chinese phonological system
- **廣韻 Guangyun** - An expanded version of the Qieyun compiled in 1008 CE, the most complete surviving source for Middle Chinese phonology
- **Yunjing** - A phonological chart system organizing Middle Chinese syllables in a systematic table format.
