export interface KeyMoment {
  timestamp: string;
  description: string;
  type: 'positive' | 'negative';
}

export interface SessionResult {
  questionId: string;
  questionText: string;
  companyName: string;
  companyLogoUrl: string;
  smartSummary: {
    whatWorkedWell: string[];
    overallTakeaways: string[];
  };
  keyMoments: KeyMoment[];
  audioDurationSeconds: number;
}
