export enum AnnouncementType {
  INSTITUCIONAL = "001",
  OPERATIONAL = "002",
}

export enum AnnouncementOperationalCategory {
  NEXT_STATION = "001",
  COMING_STATION = "002",
  WELCOME_STATION = "003",
}

export enum AnouncementOperationLineWay {
  IDA = "1",
  VOLTA = "2",
}
export class Announcement {
  /* The announcement type. */
  type: AnnouncementType;
  /** The category of the announcement. */
  operationalCategory?: AnnouncementOperationalCategory;
  /** The way of the line that the announcement is about. */
  operationalLineWay?: AnouncementOperationLineWay;
  /** The line that the announcement is about. */
  operationalLine?: number;
  /** The station that the announcement is about. */
  operationalStation?: string;
  /**	The number of the announcement. */
  institucionalNumber?: number;

  constructor(type: AnnouncementType) {
    this.type = type;
  }

  get code(): string {
    let code = this.type.toString();
    if (this.operationalCategory != null) code += this.operationalCategory;
    if (this.operationalStation != null) code += this.operationalStation;
    if (this.operationalLineWay != null) code += this.operationalLineWay;
    if (this.operationalLine != null) code += this.operationalLine;
    if (this.institucionalNumber != null)
      code += this.institucionalNumber.toString();
    return code;
  }
}
