import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  todoAllGetApi,
  todoPostApi,
  todoPutApi,
  todoDeleteApi
} from '../apis/todo.api'

// 할 일 전체 조회
export const todoAllGetSlice = createAsyncThunk(
  'todoAllGetSlice',
  async (_, thunkAPI) => {
    try {
      return await todoAllGetApi()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 할 일 등록
export const todoPostSlice = createAsyncThunk(
  'todoPostSlice',
  async (dataObj, thunkAPI) => {
    try {
      return await todoPostApi(dataObj)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 할 일 수정 및 체크 변경
export const todoPutSlice = createAsyncThunk(
  'todoPutSlice',
  async (dataObj, thunkAPI) => {
    try {
      return await todoPutApi(dataObj)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 할 일 삭제
export const todoDeleteSlice = createAsyncThunk(
  'todoDeleteSlice',
  async (id, thunkAPI) => {
    try {
      await todoDeleteApi(id)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialObj = {
  id: '',
  subject: '',
  checked: false
}

const initialState = {
  todoList: [],
  todoObj: initialObj,
  loading: false,
  error: null
}

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,

  reducers: {
    change: (state, action) => {
      state.todoObj = {
        ...state.todoObj,
        [action.payload.name]: action.payload.value
      }
    }
  },

  extraReducers: builder => {
    builder
      // 할 일 전체 조회
      .addCase(todoAllGetSlice.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(todoAllGetSlice.fulfilled, (state, action) => {
        state.todoList = action.payload
        state.loading = false
      })
      .addCase(todoAllGetSlice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // 할 일 등록
      .addCase(todoPostSlice.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(todoPostSlice.fulfilled, (state, action) => {
        state.todoList = [...state.todoList, action.payload]
        state.todoObj = initialObj
        state.loading = false
      })
      .addCase(todoPostSlice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // 할 일 수정 및 체크 변경
      .addCase(todoPutSlice.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(todoPutSlice.fulfilled, (state, action) => {
        state.todoList = state.todoList.map(todo =>
          todo.id === action.payload.id
            ? action.payload
            : todo
        )
        state.loading = false
      })
      .addCase(todoPutSlice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // 할 일 삭제
      .addCase(todoDeleteSlice.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(todoDeleteSlice.fulfilled, (state, action) => {
        state.todoList = state.todoList.filter(todo =>
          todo.id !== action.payload
        )
        state.loading = false
      })
      .addCase(todoDeleteSlice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { change } = todoSlice.actions

export default todoSlice.reducer