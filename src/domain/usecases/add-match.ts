import { MatchModel } from '../models/match'

export interface AddMatchModel {
  code: number
  teamA: string
  scoreTeamA?: number
  teamB: string
  scoreTeamB?: number
  winner?: string
  phase: string
}

export interface AddMatch {
  add (match: AddMatchModel): Promise<MatchModel>
}
