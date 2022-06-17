export type userType = {
  user_id: string;
  account_status: string;
  email: string;
  user_name: string;
  role: string;
  total_number_of_questions_done_by_user: number;
  createdAt: Date;
  deletedAt: Date;
  refresh_token: string;
  accessToken: string;
  updatedAt: Date;
  verified: boolean;
  multi_factor_enabled: boolean;
  secret: string;
  secret_backup: string;
};

export type subjectType = {
  subject_name: string;
  subject_description: string;
  image_url: string;
  topic_count: number;
  subject_id: string;
};

export type topicType = {
  topic_name: string;
  topic_description: string;
  question_count: number;
  under_which_subject: string;
  topic_id: string;
};

export type questionType = {
  question_name: string;
  difficulty: string;
  question_id: string;
  leet_code_problem_link: string;
  youtube_video_link: string;
  under_which_topic: string;
  question_description: string;
  how_many_times_solved: number;
};

export type revisionType = {
  revision_id: string;
  question_name: string;
  question_topic: string;
  revision_date: string;
};
