import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { nbCell, maxValue, maxScore } from "../components/BoardGame"
import { CellProps } from '../components/Cell'

const generateNumber = (start: number, end: number) => {
    return Math.floor(Math.random() * (end + 1)) + start
}

const isNotValidGrid = (grid: CellProps[][]) => {
    return grid.every(row => row.every((cell, index, arr) => cell.value === arr[0].value))
}

const generateNewGrid = () => {
    const newGrid = [...new Array(nbCell)].map((e, r) =>
        [...new Array(nbCell)].map((e, c) => ({ value: generateNumber(0, maxValue), visible: false, id: `R${r}C${c}` }))
    )
    if (isNotValidGrid(newGrid)) {
        generateNewGrid()
    }
    return newGrid
}

type AppState = {
    grid: CellProps[][]
    score: number
    scores: number[]
}

const initialState: AppState = {
    grid: generateNewGrid(),
    score: 0,
    scores: []
}

const slice = createSlice({
    name: "grid",
    initialState,
    reducers: {
        updateGrid: (state, action) => {
            const { score } = action.payload
            const scores = score === 0 ? state.scores : state.scores.concat(score)
            return { ...state, grid: generateNewGrid(), scores, score: 0 }
        },
        cellClick: (state, action) => {
            const { value, id } = action.payload.cell
            const score = value === 0 ? 0 : Math.min(state.score + value, maxScore)
            const grid = state.grid.map(row => {
                return row.map(cell => {
                    if (cell.id === id) {
                        return { ...cell, visible: true }
                    }
                    else return cell
                })
            })
            return { ...state, grid, score }
        }
    }
})


const rootReducer = {
    reducer: slice.reducer
}

export const appStore = configureStore(rootReducer)

export const { updateGrid, cellClick } = slice.actions

export const selectGrid = (state: AppState) => state.grid

export const selectScore = (state: AppState) => state.score

export const selectScores = (state: AppState) => state.scores