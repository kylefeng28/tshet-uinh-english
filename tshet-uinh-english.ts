/**
 * English API wrapper for tshet-uinh-js
 * Provides English method/property names while delegating to original Chinese implementation
 */

import TshetUinh from 'tshet-uinh';

/**
 * See {@link TshetUinh.音韻地位}
 */
export interface YinyunPosition {
  // Core properties
  /** See {@link TshetUinh.音韻地位.母} */
  readonly initial: string;
  /** See {@link TshetUinh.音韻地位.呼} */
  readonly rounding: string | null;
  /** See {@link TshetUinh.音韻地位.等} */
  readonly division: string;
  /** See {@link TshetUinh.音韻地位.類} */
  readonly type: string | null;
  /** See {@link TshetUinh.音韻地位.韻} */
  readonly rime: string;
  /** See {@link TshetUinh.音韻地位.聲} */
  readonly tone: string;

  // Computed properties
  /** See {@link TshetUinh.音韻地位.字母} */
  readonly zimu: string;
  /** See {@link TshetUinh.音韻地位.描述} */
  readonly description: string;
  /** See {@link TshetUinh.音韻地位.攝} */
  readonly rimeClass: string;
  /** See {@link TshetUinh.音韻地位.清濁} */
  readonly voicing: string;
  /** See {@link TshetUinh.音韻地位.簡略描述} */
  readonly briefDescription: string;
  /** See {@link TshetUinh.音韻地位.組} */
  readonly group: string | null;
  /** See {@link TshetUinh.音韻地位.表達式} */
  readonly expression: string;
  /** See {@link TshetUinh.音韻地位.音} */
  readonly articulation: string;
  /** See {@link TshetUinh.音韻地位.韻別} */
  readonly rimeType: string;
  /** See {@link TshetUinh.音韻地位.韻圖等} */
  readonly yunjingDivision: string;

  // Methods
  /** See {@link TshetUinh.音韻地位.判斷} */
  evaluate<T, E extends string | boolean = false>(
    rules: any[], 
    throws?: E, 
    fallThrough?: boolean
  ): E extends string | true ? T : T | null;
  /** See {@link TshetUinh.音韻地位.屬於} */
  belongsTo(expression: string): boolean;
  belongsTo(expression: TemplateStringsArray, ...params: unknown[]): boolean;
  /** See {@link TshetUinh.音韻地位.等於} */
  equals(other: YinyunPosition): boolean;
  /** See {@link TshetUinh.音韻地位.調整} */
  adjust(adjustments: string | Partial<Pick<YinyunPosition, 'initial' | 'rounding' | 'division' | 'type' | 'rime' | 'tone'>>, edgePositionTypes?: any[]): YinyunPosition;
  toString(): string;
}

/**
 * See {@link TshetUinh.資料.廣韻.廣韻條目}
 */
export interface GuangyunEntry {
  /** See {@link TshetUinh.資料.廣韻.廣韻條目.字頭} */
  headword: string;
  /** See {@link TshetUinh.資料.廣韻.廣韻條目.音韻地位} */
  yinyunPosition: YinyunPosition | null;
  /** See {@link TshetUinh.資料.廣韻.廣韻條目.反切} */
  fanqie: string | null;
  /** See {@link TshetUinh.資料.廣韻.廣韻條目.釋義} */
  definition: string;
  /** See {@link TshetUinh.資料.廣韻.廣韻條目.來源} */
  source: GuangyunSource;
}

/**
 * See {@link TshetUinh.資料.廣韻.廣韻來源}
 */
export interface GuangyunSource {
  /** See {@link TshetUinh.資料.廣韻.廣韻來源.文獻} */
  literature: string;
  /** See {@link TshetUinh.資料.廣韻.廣韻來源.小韻號} */
  homophoneGroupId: string;
  /** See {@link TshetUinh.資料.廣韻.廣韻來源.韻目} */
  rimeCategory: string;
}

/** {@inheritDoc GuangyunEntry} */
export interface SearchResult {
  headword: string;
  yinyunPosition: YinyunPosition;
  fanqie: string | null;
  definition: string;
  source: GuangyunSource;
}

// English API Wrapper Classes
class YinyunPositionWrapper implements YinyunPosition {
  constructor(private original: any) {}

  // Core properties
  get initial(): string { return this.original.母; }
  get rounding(): string | null { return this.original.呼; }
  get division(): string { return this.original.等; }
  get type(): string | null { return this.original.類; }
  get rime(): string { return this.original.韻; }
  get tone(): string { return this.original.聲; }

  // Computed properties
  get zimu(): string { return this.original.字母; }
  get description(): string { return this.original.描述; }
  get rimeClass(): string { return this.original.攝; }
  get voicing(): string { return this.original.清濁; }
  get briefDescription(): string { return this.original.簡略描述; }
  get group(): string | null { return this.original.組; }
  get expression(): string { return this.original.表達式; }
  get articulation(): string { return this.original.音; }
  get rimeType(): string { return this.original.韻別; }
  get yunjingDivision(): string { return this.original.韻圖等; }

  // Methods
  evaluate<T, E extends string | boolean = false>(
    rules: any[], 
    throws?: E, 
    fallThrough?: boolean
  ): E extends string | true ? T : T | null {
    return this.original.判斷(rules, throws, fallThrough);
  }

  belongsTo(expression: string): boolean;
  belongsTo(expression: TemplateStringsArray, ...params: unknown[]): boolean;
  belongsTo(expression: any, ...params: unknown[]): boolean {
    return this.original.屬於(expression, ...params);
  }

  equals(other: YinyunPosition): boolean {
    const otherOriginal = (other as YinyunPositionWrapper).original;
    return this.original.等於(otherOriginal);
  }

  adjust(adjustments: string | Partial<Pick<YinyunPosition, 'initial' | 'rounding' | 'division' | 'type' | 'rime' | 'tone'>>, edgePositionTypes: any[] = []): YinyunPosition {
    // Convert English property names back to Chinese for the original API
    let chineseAdjustments = adjustments;
    if (typeof adjustments === 'object') {
      chineseAdjustments = {};
      if (adjustments.initial !== undefined) chineseAdjustments['母'] = adjustments.initial;
      if (adjustments.rounding !== undefined) chineseAdjustments['呼'] = adjustments.rounding;
      if (adjustments.division !== undefined) chineseAdjustments['等'] = adjustments.division;
      if (adjustments.type !== undefined) chineseAdjustments['類'] = adjustments.type;
      if (adjustments.rime !== undefined) chineseAdjustments['韻'] = adjustments.rime;
      if (adjustments.tone !== undefined) chineseAdjustments['聲'] = adjustments.tone;
    }
    
    const adjusted = this.original.調整(chineseAdjustments, edgePositionTypes);
    return new YinyunPositionWrapper(adjusted);
  }

  toString(): string {
    return this.original.toString();
  }
}

// Main English API
export class TshetUinhEnglish {
  // Main constructor
  static YinyunPosition = class {
    private wrapper: YinyunPositionWrapper;

    constructor(initial: string, rounding: string | null, division: string, type: string | null, rime: string, tone: string, edgePositionTypes: any[] = []) {
      const original = new TshetUinh.音韻地位(initial, rounding, division, type, rime, tone, edgePositionTypes);
      this.wrapper = new YinyunPositionWrapper(original);
      return this.wrapper;
    }

    /** See {@link TshetUinh.音韻地位.from描述} */
    static fromDescription(description: string, brief: boolean = false, edgePositionTypes: any[] = []): YinyunPosition {
      const original = TshetUinh.音韻地位.from描述(description, brief, edgePositionTypes);
      return new YinyunPositionWrapper(original);
    }

    /** See {@link TshetUinh.音韻地位.驗證} */
    static validate(initial: string, rounding: string | null, division: string, type: string | null, rime: string, tone: string, edgePositionTypes: any[] = []): void {
      return TshetUinh.音韻地位.驗證(initial, rounding, division, type, rime, tone, edgePositionTypes);
    }
  };

  // Resources namespace
  static resources = {
    queryHeadword(headword: string): SearchResult[] {
      return TshetUinh.資料.query字頭(headword).map(result => ({
        headword: result.字頭,
        yinyunPosition: new YinyunPositionWrapper(result.音韻地位),
        fanqie: result.反切,
        definition: result.釋義,
        source: {
          literature: result.來源.文獻,
          homophoneGroupId: result.來源.小韻號,
          rimeCategory: result.來源.韻目
        }
      }));
    },

    queryYinyunPosition(position: YinyunPosition): SearchResult[] {
      const originalPosition = (position as YinyunPositionWrapper).original;
      return TshetUinh.資料.query音韻地位(originalPosition).map(result => ({
        headword: result.字頭,
        yinyunPosition: new YinyunPositionWrapper(result.音韻地位),
        fanqie: result.反切,
        definition: result.釋義,
        source: {
          literature: result.來源.文獻,
          homophoneGroupId: result.來源.小韻號,
          rimeCategory: result.來源.韻目
        }
      }));
    },

    *iterateYinyunPositions(): IterableIterator<YinyunPosition> {
      for (const position of TshetUinh.資料.iter音韻地位()) {
        yield new YinyunPositionWrapper(position);
      }
    },

    // Guangyun namespace
    Guangyun: {
      getOriginalHomophoneGroup(number: number): GuangyunEntry[] | undefined {
        const result = TshetUinh.資料.廣韻.get原書小韻(number);
        if (!result) return undefined;
        return result.map(entry => ({
          headword: entry.字頭,
          yinyunPosition: entry.音韻地位 ? new YinyunPositionWrapper(entry.音韻地位) : null,
          fanqie: entry.反切,
          definition: entry.釋義,
          source: {
            literature: entry.來源.文獻,
            homophoneGroupId: entry.來源.小韻號,
            rimeCategory: entry.來源.韻目
          }
        }));
      },

      getHomophoneGroup(id: string): GuangyunEntry[] | undefined {
        const result = TshetUinh.資料.廣韻.get小韻(id);
        if (!result) return undefined;
        return result.map(entry => ({
          headword: entry.字頭,
          yinyunPosition: entry.音韻地位 ? new YinyunPositionWrapper(entry.音韻地位) : null,
          fanqie: entry.反切,
          definition: entry.釋義,
          source: {
            literature: entry.來源.文獻,
            homophoneGroupId: entry.來源.小韻號,
            rimeCategory: entry.來源.韻目
          }
        }));
      },

      *iterateOriginalHomophoneGroups(): IterableIterator<GuangyunEntry[]> {
        for (const group of TshetUinh.資料.廣韻.iter原書小韻()) {
          yield group.map(entry => ({
            headword: entry.字頭,
            yinyunPosition: entry.音韻地位 ? new YinyunPositionWrapper(entry.音韻地位) : null,
            fanqie: entry.反切,
            definition: entry.釋義,
            source: {
              literature: entry.來源.文獻,
              homophoneGroupId: entry.來源.小韻號,
              rimeCategory: entry.來源.韻目
            }
          }));
        }
      },

      *iterateHomophoneGroups(): IterableIterator<GuangyunEntry[]> {
        for (const group of TshetUinh.資料.廣韻.iter小韻()) {
          yield group.map(entry => ({
            headword: entry.字頭,
            yinyunPosition: entry.音韻地位 ? new YinyunPositionWrapper(entry.音韻地位) : null,
            fanqie: entry.反切,
            definition: entry.釋義,
            source: {
              literature: entry.來源.文獻,
              homophoneGroupId: entry.來源.小韻號,
              rimeCategory: entry.來源.韻目
            }
          }));
        }
      },

      *iterateHomophoneGroupIds(): IterableIterator<string> {
        for (const id of TshetUinh.資料.廣韻.iter小韻號()) {
          yield id;
        }
      },

      *iterateEntries(): IterableIterator<GuangyunEntry> {
        for (const entry of TshetUinh.資料.廣韻.iter條目()) {
          yield {
            headword: entry.字頭,
            yinyunPosition: entry.音韻地位 ? new YinyunPositionWrapper(entry.音韻地位) : null,
            fanqie: entry.反切,
            definition: entry.釋義,
            source: {
              literature: entry.來源.文獻,
              homophoneGroupId: entry.來源.小韻號,
              rimeCategory: entry.來源.韻目
            }
          };
        }
      },

      get originalHomophoneGroupCount(): number {
        return TshetUinh.資料.廣韻.原書小韻總數;
      }
    }
  };

  // Encoder namespace
  static encoder = {
    encodeYinyunCode(position: YinyunPosition): string {
      const originalPosition = (position as YinyunPositionWrapper).original;
      return TshetUinh.壓縮表示.encode音韻編碼(originalPosition);
    },

    decodeYinyunCode(code: string): YinyunPosition {
      const original = TshetUinh.壓縮表示.decode音韻編碼(code);
      return new YinyunPositionWrapper(original);
    }
  };

  // Expressions namespace
  static expressions = {
    get division1Rimes(): string { return TshetUinh.表達式.一等韻; },
    get division2Rimes(): string { return TshetUinh.表達式.二等韻; },
    get division3Rimes(): string { return TshetUinh.表達式.三等韻; },
    get division4Rimes(): string { return TshetUinh.表達式.四等韻; },
    get division13Rimes(): string { return TshetUinh.表達式.一三等韻; },
    get division23Rimes(): string { return TshetUinh.表達式.二三等韻; },
    get unroundedRimes(): string { return TshetUinh.表達式.開口韻; },
    get roundedRimes(): string { return TshetUinh.表達式.合口韻; },
    get distinguishingRoundingRimes(): string { return TshetUinh.表達式.分開合韻; },
    get neutralRoundingRimes(): string { return TshetUinh.表達式.開合中立韻; }
  };

  // Utility functions
  static executeFanqie(upperPosition: YinyunPosition, lowerPosition: YinyunPosition): YinyunPosition[] {
    const upperOriginal = (upperPosition as YinyunPositionWrapper).original;
    const lowerOriginal = (lowerPosition as YinyunPositionWrapper).original;
    return TshetUinh.執行反切(upperOriginal, lowerOriginal).map(pos => new YinyunPositionWrapper(pos));
  }
}

export default TshetUinhEnglish;
export { TshetUinh };
