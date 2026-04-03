/**
 * Usage Examples for English API wrapper for tshet-uinh-js
 */

import TshetUinhEnglish from './tshet-uinh-english';

// Example 1: Basic YinyunPosition usage
function basicUsage() {
    console.log('=== Basic YinyunPosition Usage ===');
    
    // Create position using English API
    const position = new TshetUinhEnglish.YinyunPosition('幫', null, '三', 'C', '凡', '入');
    
    // Access properties using English names
    console.log(`Initial: ${position.initial}`);           // 幫
    console.log(`Rounding: ${position.rounding}`);         // null
    console.log(`Division: ${position.division}`);         // 三
    console.log(`Type: ${position.type}`);                 // C
    console.log(`Rime: ${position.rime}`);                 // 凡
    console.log(`Tone: ${position.tone}`);                 // 入
    
    // Access computed properties
    console.log(`Description: ${position.description}`);   // 幫三C凡入
    console.log(`Rime Class: ${position.rimeClass}`);      // 咸
    console.log(`Voicing: ${position.voicing}`);           // 全清
    console.log(`Articulation: ${position.articulation}`); // 脣
}

// Example 2: Create from description
function fromDescriptionUsage() {
    console.log('\n=== From Description Usage ===');
    
    const position = TshetUinhEnglish.YinyunPosition.fromDescription('見開四先去');
    
    console.log(`Position: ${position.description}`);
    console.log(`Initial: ${position.initial}`);
    console.log(`Rime Class: ${position.rimeClass}`);
    console.log(`Group: ${position.group}`);
}

// Example 3: Query headwords
function queryUsage() {
    console.log('\n=== Query Headword Usage ===');
    
    const results = TshetUinhEnglish.resources.queryHeadword('東');
    
    results.forEach(result => {
        console.log(`Character: ${result.headword}`);
        console.log(`Position: ${result.yinyunPosition.description}`);
        console.log(`Fanqie: ${result.fanqie}`);
        console.log(`Definition: ${result.definition}`);
        console.log(`Source: ${result.source.literature} ${result.source.homophoneGroupId}`);
        console.log('---');
    });
}

// Example 4: Guangyun data access
function guangyunUsage() {
    console.log('\n=== Guangyun Data Access ===');
    
    // Get homophone group
    const group = TshetUinhEnglish.resources.Guangyun.getHomophoneGroup('1');
    if (group) {
        console.log(`Homophone group 1 has ${group.length} entries:`);
        group.forEach(entry => {
            console.log(`  ${entry.headword}: ${entry.definition}`);
        });
    }
    
    // Get original homophone group
    const originalGroup = TshetUinhEnglish.resources.Guangyun.getOriginalHomophoneGroup(1);
    if (originalGroup) {
        console.log(`\nOriginal homophone group 1 has ${originalGroup.length} entries`);
    }
    
    // Total count
    console.log(`Total original homophone groups: ${TshetUinhEnglish.resources.Guangyun.originalHomophoneGroupCount}`);
}

// Example 5: Encoding/Decoding
function encodingUsage() {
    console.log('\n=== Encoding/Decoding Usage ===');
    
    const position = TshetUinhEnglish.YinyunPosition.fromDescription('幫三C凡入');
    
    // Encode to compressed format
    const encoded = TshetUinhEnglish.encoder.encodeYinyunCode(position);
    console.log(`Encoded: ${encoded}`);
    
    // Decode back
    const decoded = TshetUinhEnglish.encoder.decodeYinyunCode(encoded);
    console.log(`Decoded: ${decoded.description}`);
    console.log(`Equal: ${position.equals(decoded)}`);
}

// Example 6: Using expressions
function expressionsUsage() {
    console.log('\n=== Expressions Usage ===');
    
    const position = TshetUinhEnglish.YinyunPosition.fromDescription('見開三A支平');
    
    // Test against predefined expressions
    console.log(`Is division 3 rime: ${position.belongsTo(TshetUinhEnglish.expressions.division3Rimes)}`);
    console.log(`Is unrounded rime: ${position.belongsTo(TshetUinhEnglish.expressions.unroundedRimes)}`);
    
    // Custom expression
    console.log(`Is velar initial: ${position.belongsTo('見組')}`);
}

// Example 7: Position adjustment
function adjustmentUsage() {
    console.log('\n=== Position Adjustment Usage ===');
    
    const original = TshetUinhEnglish.YinyunPosition.fromDescription('幫三C元上');
    console.log(`Original: ${original.description}`);
    
    // Adjust using object syntax
    const adjusted1 = original.adjust({ tone: '平' });
    console.log(`Adjusted tone: ${adjusted1.description}`);
    
    // Adjust using string syntax
    const adjusted2 = original.adjust('見母 合口');
    console.log(`Adjusted initial and rounding: ${adjusted2.description}`);
}

// Example 8: Iteration
function iterationUsage() {
    console.log('\n=== Iteration Usage ===');
    
    // Iterate first 5 positions
    let count = 0;
    for (const position of TshetUinhEnglish.resources.iterateYinyunPositions()) {
        console.log(`Position ${count + 1}: ${position.description}`);
        if (++count >= 5) break;
    }
    
    // Iterate first 3 homophone group IDs
    count = 0;
    for (const id of TshetUinhEnglish.resources.Guangyun.iterateHomophoneGroupIds()) {
        console.log(`Homophone group ID: ${id}`);
        if (++count >= 3) break;
    }
}

// Example 9: Fanqie execution
// adapted from 反切.spec.ts: 可以為反切結果給出解釋
function fanqieUsage() {
    console.log('\n=== Fanqie Execution Usage ===');
    
    const target = TshetUinhEnglish.YinyunPosition.fromDescription('端一東平');  // 東
    const upper = TshetUinhEnglish.YinyunPosition.fromDescription('端開一登入');  // 德
    const lower = TshetUinhEnglish.YinyunPosition.fromDescription('匣一東平');  // 紅
    
    const results = TshetUinhEnglish.executeFanqie(upper, lower);
    console.log(`Fanqie results (${results.length} possibilities):`);
    results.forEach((result, i) => {
        console.log(`  ${i + 1}: ${result.description}, equal to target: ${result.equals(target)}`);
    });

}

function runAllExamples() {
    basicUsage();
    fromDescriptionUsage();
    queryUsage();
    guangyunUsage();
    encodingUsage();
    expressionsUsage();
    adjustmentUsage();
    iterationUsage();
    fanqieUsage();
}

if (require.main === module) {
    runAllExamples();
}
