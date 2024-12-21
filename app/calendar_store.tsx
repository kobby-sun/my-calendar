import { createSlice, configureStore, PayloadAction, createSelector } from '@reduxjs/toolkit'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export function createEventId() {
  return String(eventGuid++)
}

export interface CalendarState {
  events: CalendarItem[],
  searchKeyword: string
}

export interface CalendarItem {
    id: string
    start: string,
    title: string
    description: string
  }

const DEFAULT_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    description: 'All-day event desc'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    description: 'Timed event desc'
  }
]

const calendarSlice = createSlice({
  name: 'my-calendar',
  initialState: {
    events: [
      ...DEFAULT_EVENTS
    ] as CalendarItem[],
    searchKeyword: ''
  } as CalendarState,
  selectors: {
    searchedItems: createSelector(
      (calendarState: CalendarState) => calendarState,
      (state) => state.events.filter(x => !state.searchKeyword || x.title.toLowerCase().indexOf(state.searchKeyword.toLowerCase()) !== -1 || x.description.toLowerCase().indexOf(state.searchKeyword.toLowerCase()) !== -1),
    )
  },
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarItem>) => {
      state.events = [
        ...state.events,
        {...action.payload}
      ]
    },
    searchEvents: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload
    },
    clearSearch: (state) => {
      state.searchKeyword = ''
    },
    removeEvent: (state, action: PayloadAction<string>) => {
        let idx = state.events.findIndex(x => x.id === action.payload);
        if (idx !== -1) 
            state.events = [
                ...state.events.slice(0, idx),
                ...state.events.slice(idx + 1)
        ]
    }
  }
})

export const { addEvent, searchEvents, removeEvent, clearSearch } = calendarSlice.actions

export const { searchedItems } = calendarSlice.selectors

export default configureStore({
  reducer: {
    "my-calendar": calendarSlice.reducer 
  }
})
