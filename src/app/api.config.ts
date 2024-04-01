export const API_CONFIG = {
  baseUrl: 'http://localhost:8000/api',
  generalEndpoints: {
    ADMIN_LOGIN:  '/auth/login',
  },
  adminEndpoints: {
    GRID_ROWDATA: '/admin/table/rowData',
    GRID_COLUMNINFO: '/admin/table/columnInfo',
    VIEW_TEST_CONFIG: '/admin/variables',
    SAVE_TEST_CONFIIG: '/admin/variables',
    GET_CATEGORIES_LIST: '/admin/category/all',
    ADD_QUESTION: '/admin/questions/add',
    ADD_CATEGORY: '/admin/category',
    GET_QUESTION: '/admin/questions'
  }
}