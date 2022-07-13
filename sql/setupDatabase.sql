use cw_db_dev;
insert into fs_configs (id, dir, latest_folder, max_file_per_folder, created_at, updated_at) values (1, './Materials_Directory', '0', 1000, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into statuses (id, type, created_at, updated_at) values (1, 'Draft', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into statuses (id, type, created_at, updated_at) values (2, 'Published', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into statuses (id, type, created_at, updated_at) values (3, 'Unpublished', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into permissions (id, type, created_at, updated_at) values (1, 'Admin', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into permissions (id, type, created_at, updated_at) values (2, 'Instructor', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into permissions (id, type, created_at, updated_at) values (3, 'TA', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into permissions (id, type, created_at, updated_at) values (4, 'Student', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into submission_statuses (id, type, created_at, updated_at) values (1, 'No attempt', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into submission_statuses (id, type, created_at, updated_at) values (2, 'Submitted for grading', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into grading_statuses (id, type, created_at, updated_at) values (1, 'Not graded', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into grading_statuses (id, type, created_at, updated_at) values (2, 'Graded', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into users (id, first_name, last_name, email, password, permission_id, created_at, updated_at) values ('7ab25e23-f2cf-448d-a595-6c464188ff0f', 'Devon', 'Robitaille', 'devon.robitaille@protonmail.com', '$2a$10$n.VToS4.AjmWXX4W/YMHPO8iGTzKb.ptASSGsKhPHcAp.pZu2nylW', 1, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into users (id, first_name, last_name, email, password, permission_id, created_at, updated_at) values ('6ee5a55c-7876-4031-ad61-51bf391e17f3', 'Test', 'Test', 'test@test.com', '$2a$10$n.VToS4.AjmWXX4W/YMHPO8iGTzKb.ptASSGsKhPHcAp.pZu2nylW', 4, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into courses (id, title, description, user_id, status_id, created_at, updated_at) values (1, 'DP1.0', 'Learning stuff', '7ab25e23-f2cf-448d-a595-6c464188ff0f', 1, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into sections (id, title, description, user_id, status_id, course_id, created_at, updated_at) values (1, 'Serial 2020', 'Learning stuff', '7ab25e23-f2cf-448d-a595-6c464188ff0f', 1, 1, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into sections (id, title, description, user_id, status_id, course_id, created_at, updated_at) values (2, 'Serial 2021', 'Learning stuff 2', '7ab25e23-f2cf-448d-a595-6c464188ff0f', 1, 1, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into topics (id, title, description, status_id, section_id, created_at, updated_at) values (1, 'Linux 101', 'Get gud', 1, 1, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into topics (id, title, description, status_id, section_id, created_at, updated_at) values (2, 'Networking 101', 'Get gud', 1, 1, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into topics (id, title, description, status_id, section_id, created_at, updated_at) values (3, 'Test 101', 'Get gud', 1, 2, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into assignments (id, topic_id, title, description, num_of_attempts, grade_weight, grade_range, due_date, open_date, created_at, updated_at) values ('65517b89-eb41-4353-b1cc-2016458a5e90', 1, 'Assignment 1', 'Some description', 1, 15, 100, '2021-02-18 00:00:00', '2021-02-18 00:00:00', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into assignments (id, topic_id, title, description, num_of_attempts, grade_weight, grade_range, due_date, open_date, created_at, updated_at) values ('956b8a54-fdf6-4335-ab14-734006b3b776', 2, 'Assignment 2', 'Some description', 100, 15, 100, '2021-03-12 00:00:00', '2021-02-18 00:00:00', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into submissions (id, assignment_id, submission_status_id, grading_status_id, attempt_number, user_id, created_at, updated_at) values ('7f7658d3-d320-4bf4-a471-bcdffd64c154', '65517b89-eb41-4353-b1cc-2016458a5e90', 2, 1, 1, '7ab25e23-f2cf-448d-a595-6c464188ff0f', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into submissions (id, assignment_id, submission_status_id, grading_status_id, attempt_number, user_id, created_at, updated_at) values ('57162e88-c07c-4de7-a158-de59c7bc9847', '65517b89-eb41-4353-b1cc-2016458a5e90', 2, 2, 3, '6ee5a55c-7876-4031-ad61-51bf391e17f3', '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into feedbacks (id, submission_id, user_id, grade, created_at, updated_at) values ('1ce8efed-b92c-4396-9b68-3d3133457656', '57162e88-c07c-4de7-a158-de59c7bc9847', '7ab25e23-f2cf-448d-a595-6c464188ff0f', 100, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into user_taking_sections (id, user_id, section_id, permission_id, created_at, updated_at) values ('e175fdc7-b35a-4cea-ac4c-2e2e27d4bf01', '7ab25e23-f2cf-448d-a595-6c464188ff0f', 1, 2, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into user_taking_sections (id, user_id, section_id, permission_id, created_at, updated_at) values ('3fcff6ba-98ad-4e85-b0cd-f45a2ed2fba3', '7ab25e23-f2cf-448d-a595-6c464188ff0f', 2, 2, '2021-02-18 00:00:00', '2021-02-18 00:00:00');
insert into user_taking_sections (id, user_id, section_id, permission_id, created_at, updated_at) values ('6768360d-4449-43cf-ae13-1ac51445cf3a', '6ee5a55c-7876-4031-ad61-51bf391e17f3', 1, 4, '2021-02-18 00:00:00', '2021-02-18 00:00:00');