export interface LineageData {
  /** 来源 */
  refFields: LineageItem[];
  /** 目标 */
  targetField?: LineageItem;
}

export interface LineageItem {
  /** 库名称 + 表名称 +字段名称， 中间 "." 分隔*/
  fieldName: string;
  /** 是否是层级最大的，即是否是最外层的 */
  final?: string;
  /** order */
  index?: string;
  /** 层级 */
  level?: string;
}
