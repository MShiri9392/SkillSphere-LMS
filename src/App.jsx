import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import SubmitAssignment from "./pages/SubmitAssignment";
import Submissions from "./pages/Submissions";
import GradeSubmission from "./pages/GradeSubmission";
import CourseDetails from "./pages/CourseDetails";
import Analytics from "./pages/Analytics";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import Quiz from "./pages/Quiz";
import AddQuiz from "./pages/AddQuiz";
import EditQuiz from "./pages/EditQuiz";
import QuizAttempt from "./pages/QuizAttempt";
import Progress from "./pages/Progress";
import Certificate from "./pages/Certificate";
import Wishlist from "./pages/Wishlist";
import Announcements from "./pages/Announcements";
import AddAnnouncement from "./pages/AddAnnouncement";
import Notifications from "./pages/Notifications";
import Assignments from "./pages/Assignments";
import AddAssignment from "./pages/AddAssignment";
import EditAssignment from "./pages/EditAssignment";
import AssignmentSubmission from "./pages/AssignmentSubmission";
import Discussions from "./pages/Discussions";
import AddDiscussion from "./pages/AddDiscussion";
import AnswerDiscussion from "./pages/AnswerDiscussion";
import CourseReview from "./pages/CourseReview";
import Reviews from "./pages/Reviews";
import AddReview from "./pages/AddReview";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Dashboard (All Logged-in Users) */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* ================= ADMIN ================= */}

            <Route
                path="/analytics"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                        <Layout>
                            <Analytics />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/users"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                        <Layout>
                            <Users />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/add-user"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                        <Layout>
                            <AddUser />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/edit-user/:id"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                        <Layout>
                            <EditUser />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />
            <Route
                path="/course/:id"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <CourseDetails />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add-course"
                element={
                      <RoleProtectedRoute allowedRoles={["ADMIN","INSTRUCTOR"]}>
                           <Layout>
                              <AddCourse />
                          </Layout>
                     </RoleProtectedRoute>
               }
           /> 

           <Route
                path="/edit-course/:id"
                element={
                     <RoleProtectedRoute allowedRoles={["ADMIN","INSTRUCTOR"]}>
                           <Layout>
                              <EditCourse />
                          </Layout>
                     </RoleProtectedRoute>
            }
          />
          <Route
              path="/submit-assignment/:assignmentId"
              element={
                  <Layout>
                      <SubmitAssignment />
                  </Layout>
              }
           />

          <Route
             path="/submissions"
             element={
                 <Layout>
                     <Submissions />
                 </Layout>
            }
         />
         <Route
             path="/grade-submission/:id"
             element={
                <Layout>
                    <GradeSubmission />
               </Layout>
             }
         />

            <Route
                path="/payments"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                        <Layout>
                            <Payment />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />

            {/* ========== ADMIN + INSTRUCTOR ========== */}

            <Route
                path="/assignment"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN", "INSTRUCTOR"]}>
                        <Layout>
                            <Assignments />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />
            <Route
                path="/add-assignment"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN", "INSTRUCTOR"]}>
                        <Layout>
                            <AddAssignment />
                        </Layout>
                    </RoleProtectedRoute>
             }
            />
            <Route
                path="/edit-assignment/:id"
                element={
                   <RoleProtectedRoute allowedRoles={["ADMIN", "INSTRUCTOR"]}>
                       <Layout>
                           <EditAssignment />
                       </Layout>
                   </RoleProtectedRoute>
                }
            />
            <Route
                path="/courses"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN", "INSTRUCTOR", "STUDENT"]}>
                        <Layout>
                            <Courses />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />


            {/* ========== ALL USERS ========== */}

            <Route
                path="/enrollments"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Enrollments />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/quiz"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Quiz />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add-quiz"
                element={
                   <RoleProtectedRoute allowedRoles={["ADMIN", "INSTRUCTOR"]}>
                        <Layout>
                             <AddQuiz />
                        </Layout>
                   </RoleProtectedRoute>
              }
            />
            <Route
                 path="/edit-quiz/:id"
                 element={
                      <RoleProtectedRoute allowedRoles={["ADMIN", "INSTRUCTOR"]}>
                          <Layout>
                                <EditQuiz />
                          </Layout>
                     </RoleProtectedRoute>
              }
           />

            <Route
                path="/quiz-attempt"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <QuizAttempt />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/progress"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Progress />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reviews"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Reviews />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add-review"
                element={
                    <RoleProtectedRoute allowedRoles={["STUDENT"]}>
                        <Layout>
                            <AddReview />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />
            
            <Route
                path="/announcements"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Announcements />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/add-announcement" 
                element={
                  <ProtectedRoute>
                      <Layout>
                        <AddAnnouncement/>
                    </Layout>
                  </ProtectedRoute>
                
                } 
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Notifications />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/submission"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <AssignmentSubmission />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/discussions"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Discussions />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add-discussion"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <AddDiscussion />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            
            <Route
                path="/answer-discussion/:id"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <AnswerDiscussion />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Profile />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/change-password"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <ChangePassword />
                        </Layout>
                    </ProtectedRoute>
                }
            />

            {/* ========== STUDENT ONLY ========== */}

            <Route
                path="/wishlist"
                element={
                    <RoleProtectedRoute allowedRoles={["STUDENT"]}>
                        <Layout>
                            <Wishlist />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />

            <Route
                path="/certificate"
                element={
                    <RoleProtectedRoute allowedRoles={["ADMIN", "STUDENT"]}>
                        <Layout>
                            <Certificate />
                        </Layout>
                    </RoleProtectedRoute>
                }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default App;