import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  employeeAllGetApi,
  employeePostApi,
  employeePutApi,
  employeeDeleteApi
} from '../apis/employee.api'

// 전체 직원 조회
export const employeeAllGetApiSlice = createAsyncThunk(
  'employeeAllGetApiSlice',
  async (_, thunkAPI) => {
    try {
      return await employeeAllGetApi()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 직원 등록
export const employeePostSlice = createAsyncThunk(
  'employeePostSlice',
  async (dataObj, thunkAPI) => {
    try {
      return await employeePostApi(dataObj)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 직원 수정
export const employeePutSlice = createAsyncThunk(
  'employeePutSlice',
  async (dataObj, thunkAPI) => {
    try {
      return await employeePutApi(dataObj)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 직원 삭제
export const employeeDeleteSlice = createAsyncThunk(
  'employeeDeleteSlice',
  async (id, thunkAPI) => {
    try {
      return await employeeDeleteApi(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialEmp = {
  id: '',
  name: '',
  email: '',
  job: '',
  pay: ''
}

const initialState = {
  empTable: [],
  emp: initialEmp,
  mode: '',
  selectedId: '',
  loading: false,
  error: null
}

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState,

  reducers: {
    select: (state, action) => {
      state.selectedId = action.payload
    },

    setEmp: (state, action) => {
      state.emp = action.payload
    },

    setMode: (state, action) => {
      state.mode = action.payload
    }
  },

  extraReducers: builder => {
    builder
      // 전체 직원 조회
      .addCase(employeeAllGetApiSlice.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(employeeAllGetApiSlice.fulfilled, (state, action) => {
        state.empTable = action.payload
        state.loading = false
      })
      .addCase(employeeAllGetApiSlice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // 직원 등록
      .addCase(employeePostSlice.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(employeePostSlice.fulfilled, (state, action) => {
        state.empTable = [...state.empTable, action.payload]
        state.loading = false
      })
      .addCase(employeePostSlice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // 직원 수정
      .addCase(employeePutSlice.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(employeePutSlice.fulfilled, (state, action) => {
        state.empTable = state.empTable.map(emp =>
          emp.id === state.selectedId ? action.payload : emp
        )
        state.loading = false
      })
      .addCase(employeePutSlice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // 직원 삭제
      .addCase(employeeDeleteSlice.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(employeeDeleteSlice.fulfilled, state => {
        state.empTable = state.empTable.filter(
          emp => emp.id !== state.selectedId
        )
        state.selectedId = ''
        state.emp = initialEmp
        state.loading = false
      })
      .addCase(employeeDeleteSlice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const {
  select,
  setEmp,
  setMode
} = employeeSlice.actions

export default employeeSlice.reducer