
export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  category: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface StudyPlanItem {
  time: string;
  activity: string;
  topic: string;
  duration: string;
}

export interface StudyPlan {
  title: string;
  schedule: StudyPlanItem[];
}

export interface NoteSummary {
  summary: string;
  keyConcepts: string[];
  actionItems: string[];
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}
