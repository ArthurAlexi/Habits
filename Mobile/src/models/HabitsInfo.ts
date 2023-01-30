export interface HabitsInfo{
    possibleHabits: Array<{
        id: string,
        title : string
        created_at: string
    }>,
    completedHabits: string[],
}