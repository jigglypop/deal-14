type WhereOption = {
  column: string;
  equalValue: string | number;
}

type OrderOption = {
  column: string;
  type: 'DESC' | 'ASC';
}

type JoinOption = {
  type: 'LEFT JOIN' | 'JOIN'
  joinTable: string;
  joinPK: string;
  equalColum: string;
}

class SelectSQLGenerator {
  private whereOptions: WhereOption[] = [];
  private orderByOptions: OrderOption[] = [];
  private joinOptions: JoinOption[] = [];

  constructor(private table: string, private attributes: string) { }

  addWhere(option: WhereOption) {
    this.whereOptions.push(option);
  }

  addOrderBy(option: OrderOption) {
    this.orderByOptions.push(option);
  }

  addJoin(option: JoinOption) {
    this.joinOptions.push(option);
  }

  generate() {
    let sql = `SELECT ${this.attributes} FROM ${this.table} `;
    if (this.joinOptions.length > 0) {
      this.joinOptions.forEach(option => {
        sql += ` ${option.type} ${option.joinTable} ON ${option.equalColum} = ${option.joinTable}.${option.joinPK} `;
      });
    }

    if (this.whereOptions.length > 0) {
      this.whereOptions.reduce((prefix: string, option) => {
        if (typeof option.equalValue === 'string') {
          sql += ` ${prefix} ${option.column} = '${option.equalValue}'`;
        } else {
          sql += ` ${prefix} ${option.column} = ${option.equalValue}`;
        }

        return 'AND';
      }, 'WHERE');
    }

    if (this.orderByOptions.length > 0) {
      sql += ` ORDER BY `;
      this.orderByOptions.forEach(option => {
        sql += ` ${option.column} ${option.type} `;
      });
    }

    return sql;
  }
}

export default SelectSQLGenerator;
