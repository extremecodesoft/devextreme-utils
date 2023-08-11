import { isEmpty } from 'lodash';
import { Transformer } from './Transformer';
//import { FindOptions } from '../DataStore';

export class OrionFilterTransformer implements Transformer<any> {
  
  private operators = new Map<string, string>([
    ['=', '='],
    ['>', '>'],
    ['>=', '>='],
    ['<', '<'],
    ['<=', '<='],
    ['<>', '!='],
    ['contains', 'like'],
    ['notcontains', 'not like'],
    ['startswith', 'like'],
    ['endswith', 'like'],
    ['in', 'in'],
    ['not in', 'not in'],
    ['custom', 'custom'],
  ]);

  //{"and":[{"id": {"gt": 59158}},{"id": {"lt": 1158}}]}
  private normalizeOperator(operator: string) {
    //console.log(operator);
    return this.operators.get(operator);
  }

  private normalizeValue(value: string | number, operator: string) {
    switch (operator) {
      case '=' : return value;
      case '>' : return value;
      case '>=' : return value;
      case '<' : return value;
      case '<=' : return value;
      case '<>' : return value;
      case 'contains' : return `%${value}%`;
      case 'notcontains' : return `%${value}%`;
      case 'startswith' : return `${value}%`;
      case 'endswith' : return `%${value}`;
      case 'in' : return value;
      case 'not in' : return value;
      case 'custom' : return value;
    }
  }

  private normalizeDevExtremeItemFilter(item: any): any {
    return {
      field: item[0],
      operator: this.normalizeOperator(item[1]),
      value: this.normalizeValue(item[2], item[1])
    };
  }

  private normalizeDevExtremeFilter(filter: any, returnArray: boolean = true): any {
    if (Array.isArray(filter) && !filter.length) {
      return null;
    }
    if (!Array.isArray(filter[0])) {
      const o = this.normalizeDevExtremeItemFilter(filter);
      return (returnArray) ? [o] : o;
    }
    let cond = filter.find((item: any) => !Array.isArray(item));
    if (!cond) {
      cond = 'and';
    }
    const items = filter.filter((item: any) => Array.isArray(item));
    const o = {
      type: cond,
      nested: items.map((item: any) => (Array.isArray(item[0])) ? this.normalizeDevExtremeFilter(item, false) : this.normalizeDevExtremeItemFilter(item))
    };

    return (returnArray) ? [o] : o;
  }    

  execute(data: any): any {
    if (!data || isEmpty(data)) {
      return null;
    }

    return this.normalizeDevExtremeFilter(data, true);
  }
}