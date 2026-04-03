## tshet-uinh-english
This is an English wrapper of the tshet-uinh-js JavaScript library: [nk2028/tshet-uinh-js](https://github.com/nk2028/tshet-uinh-js).

Thanks to @ayaka14732 for all the hard work creating and maintaining this library!

I wanted to use this library to analyze how well Middle Chinese pronunciation maps onto modern Chinese dialects like Mandarin and Cantonese, as well as trying to see if I can use it to predict Japanese 音読み (on'yomi) readings or Korean 음독 (eumdok) readings of kanji/hanja loanwords.

However, although I can speak and understand Chinese, I didn't grow up in China, so my reading ability is severely limited (especially for reading Traditional Chinese characters), so I made this as a more convenient API for myself to use.

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

---

## API
There should be a 1:1 correspondence between the English API and the original Chinese-based tshet-uinh-js API.

Most of the terms should be explained in the glossary above. However, it is important to note that I have take the liberty of translating some terms to English where the semantic meaning makes sense or is clear enough, and transliterating the terms when there is no suitable English equivalent. For example:

- Translated terms:
   - 小韻 (xiaoyun) → `homophoneGroup`
   - 字頭 → `headword`
   - 壓縮表示 (compression representation) → `encoder`
   - 原書小韻 → `originalHomophoneGroup` (distinguishes from subdivided groups)

- Transliterated terms:
   - 音韻 → yinyun (phonology)
   - 反切 → fanqie (spelling system)
   - 廣韻 → Guangyun (dictionary name)


### Main Namespaces

| Chinese | English | Description |
|---------|---------|-------------|
| TshetUinh.資料 | TshetUinh.resources | Data/resource access |
| TshetUinh.壓縮表示 | TshetUinh.encoder | Compression/encoding utilities |
| TshetUinh.表達式 | TshetUinh.expressions | Predefined expressions |


### Classes

| Chinese | English | Description |
|---------|---------|-------------|
| 音韻地位 | YinyunPosition | Phonological position (main class) |


### Core Properties (音韻地位/YinyunPosition)

| Chinese | English | Description |
|---------|---------|-------------|
| 母 | initial | Initial consonant |
| 呼 | rounding | Rounding (開口/合口) |
| 等 | division | Division (一二三四等) |
| 類 | type | Type (ABC類) |
| 韻 | rime | Rime |
| 聲 | tone | Tone |


### Computed Properties (音韻地位/YinyunPosition)

| Chinese | English | Description |
|---------|---------|-------------|
| 字母 | zimu | 36 initials (三十六字母) |
| 描述 | description | Full description |
| 攝 | rimeClass | Rime class (攝) |
| 清濁 | voicing | Voicing (清濁) |
| 簡略描述 | briefDescription | Brief description |
| 組 | group | Initial group |
| 表達式 | expression | Expression for 屬於 function |
| 音 | articulation | Place of articulation |
| 韻別 | rimeType | Rime type (陰聲韻/陽聲韻/入聲韻) |


### Methods (音韻地位/YinyunPosition)

| Chinese | English | Description |
|---------|---------|-------------|
| 判斷 | evaluate | Evaluate conditions |
| 屬於 | belongsTo | Check if belongs to expression |
| 等於 | equals | Check equality |
| 調整 | adjust | Adjust properties |
| from描述 | fromDescription | Create from description |
| 驗證 | validate | Validate phonological position |


### Resource Functions (資料/resources)

| Chinese | English | Description |
|---------|---------|-------------|
| query字頭 | queryHeadword | Query by headword |
| query音韻地位 | queryYinyunPosition | Query by phonological position |
| iter音韻地位 | iterateYinyunPositions | Iterate phonological positions |


### Guangyun Namespace (`資料.廣韻/resources.Guangyun`)

| Chinese | English | Description |
|---------|---------|-------------|
| get原書小韻 | getOriginalHomophoneGroup | Get entries by original homophone group number |
| get小韻 | getHomophoneGroup | Get entries by homophone group ID |
| iter原書小韻 | iterateOriginalHomophoneGroups | Iterate original homophone groups |
| iter小韻 | iterateHomophoneGroups | Iterate homophone groups |
| iter小韻號 | iterateHomophoneGroupIds | Iterate homophone group IDs |
| iter條目 | iterateEntries | Iterate all entries |
| 原書小韻總數 | originalHomophoneGroupCount | Total count of original homophone groups |

### Guangyun Data Structures

#### 廣韻條目 (GuangyunEntry)

| Chinese | English | Description |
|---------|---------|-------------|
| 字頭 | headword | Character headword |
| 音韻地位 | yinyunPosition | Phonological position |
| 反切 | fanqie | Fanqie spelling |
| 釋義 | definition | Definition/explanation |
| 來源 | source | Source information |


#### 廣韻來源 (GuangyunSource)

| Chinese | English | Description |
|---------|---------|-------------|
| 文獻 | literature | Literature source |
| 小韻號 | homophoneGroupId | Homophone group ID |
| 韻目 | rimeCategory | Rime category |


### Encoding Functions (壓縮表示/encoder)

| Chinese | English | Description |
|---------|---------|-------------|
| encode音韻編碼 | encodeYinyunCode | Encode phonological code |
| decode音韻編碼 | decodeYinyunCode | Decode phonological code |


### Computed Properties

| Chinese | English | Description |
|---------|---------|-------------|
| 轉名稱 | tableName | Table name |
| 坐標 | coordinates | Coordinates |
| 切韻等 | qieyunDivision | Qieyun division |
| 韻 | rime | Rime |
| 母 | initial | Initial |
| 呼 | rounding | Rounding |
| 聲 | tone | Tone |
| 類 | type | Type |
| 描述 | description | Description |

### Methods

| Chinese | English | Description |
|---------|---------|-------------|
| to音韻地位 | toYinyunPosition | Convert to YinyunPosition |
| 等於 | equals | Check equality |

## Expression Variables (表達式/expressions)

| Chinese | English | Description |
|---------|---------|-------------|
| 一等韻 | division1Rimes | Division 1 rimes |
| 二等韻 | division2Rimes | Division 2 rimes |
| 三等韻 | division3Rimes | Division 3 rimes |
| 四等韻 | division4Rimes | Division 4 rimes |
| 一三等韻 | division13Rimes | Division 1&3 rimes |
| 二三等韻 | division23Rimes | Division 2&3 rimes |
| 開口韻 | unroundedRimes | Unrounded rimes |
| 合口韻 | roundedRimes | Rounded rimes |
| 分開合韻 | distinguishingRoundingRimes | Rimes distinguishing rounding |
| 開合中立韻 | neutralRoundingRimes | Rounding-neutral rimes |

## Other Functions

| Chinese | English | Description |
|---------|---------|-------------|
| 執行反切 | executeFanqie | Execute fanqie spelling |


## Type Aliases

| Chinese | English | Description |
|---------|---------|-------------|
| 判斷規則列表 | EvaluationRuleList | List of evaluation rules |
| 邊緣地位種類指定 | EdgePositionTypeSpecification | Edge position type specification |
| 部分音韻屬性 | PartialYinyunAttributes | Partial phonological attributes |
| 來源類型 | SourceType | Source type |
| 檢索結果 | SearchResult | Search result |
| 王三來源 | WangSanSource | Wang San source |


## Constants/Attributes (音韻屬性常量)

| Chinese | English | Description |
|---------|---------|-------------|
| 音韻屬性常量 | YinyunAttributeConstants | Phonological attribute constants |

## Usage Examples

### Original Chinese API:
```javascript
const 地位 = new TshetUinh.音韻地位('幫', null, '三', 'C', '凡', '入');
const 結果 = TshetUinh.資料.query字頭('東');
const 編碼 = TshetUinh.壓縮表示.encode音韻編碼(地位);

// 廣韻資料
const 條目 = TshetUinh.資料.廣韻.get小韻('3708b');
const 原書小韻 = TshetUinh.資料.廣韻.get原書小韻(1234);
for (const 小韻 of TshetUinh.資料.廣韻.iter小韻()) {
  // 可以用小韻執行下事吧
}
```

### English API:
```javascript
const position = new TshetUinh.YinyunPosition('幫', null, '三', 'C', '凡', '入');
const result = TshetUinh.resources.queryHeadword('東');
const encoded = TshetUinh.encoder.encodeYinyunCode(position);

// Guangyun data access
const entries = TshetUinh.resources.Guangyun.getHomophoneGroup('3708b');
const originalGroup = TshetUinh.resources.Guangyun.getOriginalHomophoneGroup(1234);
for (const group of TshetUinh.resources.Guangyun.iterateHomophoneGroups()) {
  // Process homophone groups...
}
```
