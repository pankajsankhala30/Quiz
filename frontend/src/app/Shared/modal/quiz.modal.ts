export interface ADD_QUIZ {
    quiz_title: string
    questions: QUESTION[]
}

export interface QUESTION {
    question: string
    options: OPTION[]
}

export interface OPTION {
    text: string
    isCorrect: boolean
}

export interface BULK_QUIZ_DELETE {
    ids: []
}
export interface SUBMIT_QUIZ {
    email: string
    username: string
    quizId: string
    questions: SUBMIT_QUESTION[]
  }
  
  export interface SUBMIT_QUESTION {
    question: string
    options: SUBMIT_OPTION[]
    _id: string
  }
  
  export interface SUBMIT_OPTION {
    text: string
    answer?: boolean
  }
  