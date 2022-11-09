export interface IArg {
    code: string,
    timeout?: number,
    input: string,
    similarWorkingJobCount: number
}

export interface IResult {
    id: number,
    start_date: number,
}