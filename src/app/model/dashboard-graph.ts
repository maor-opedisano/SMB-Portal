

export class DashboardGraph {
  list: DashboardGraphKeyValuePair[];
}

export class DashboardGraphKeyValuePair {
  name: string;
  series: DashboardGraphValue;
}

export class DashboardGraphValue {
  name: string;
  value: string;
}
