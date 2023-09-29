import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import attendanceReducer from "./slices/attendance";
import coursePermissionsReducer from "./slices/course_permissions";
import courseReducer from "./slices/course";
import enrollmentReducer from "./slices/enrollment";
import sessionReducer from "./slices/session";
import siteCourseAvailabilityReducer from "./slices/site_course_availability";
import sitePermissionsReducer from "./slices/site_permissions";
import siteReducer from "./slices/site";
import transactionReducer from "./slices/transaction";
import userSiteAvailabilityReducer from "./slices/user_site_availability";
import userReducer from "./slices/user";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  attendance: attendanceReducer,
  course_permissions: coursePermissionsReducer,
  course: courseReducer,
  enrollment: enrollmentReducer,
  session: sessionReducer,
  site_course_availability: siteCourseAvailabilityReducer,
  site_permissions: sitePermissionsReducer,
  site: siteReducer,
  transaction: transactionReducer,
  user_site_availability: userSiteAvailabilityReducer,
  user: userReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export default store;
