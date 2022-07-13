'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config')
const db = {};

console.log(config)

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    dialect: 'mysql',
    host: config.db.host,
    poirt: config.db.port,
    logQueryParameters: true,
    logging: false
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ASSOCIATIONS

// Assignments
db.assignment.belongsTo(db.topic)
db.assignment.belongsToMany(db.material, { through: db.material_in_assignment})
db.assignment.hasMany(db.material_in_assignment)
db.assignment.hasMany(db.submission)

// Courses
db.course.belongsTo(db.status)
db.course.belongsTo(db.user)
db.course.hasMany(db.course_history)
db.course.hasMany(db.section)

// Course_History
db.course_history.belongsTo(db.status)
db.course_history.belongsTo(db.course)
db.course_history.belongsTo(db.user)

// Feedback
db.feedback.belongsTo(db.submission)
db.feedback.belongsTo(db.user)
db.feedback.belongsToMany(db.material, { through: db.material_in_feedback})
db.feedback.hasMany(db.material_in_feedback)

// Grading_Status
db.grading_status.hasMany(db.submission)

// Permissions
db.permission.hasMany(db.user)
db.permission.hasMany(db.user_taking_section)

// Material
db.material.belongsTo(db.section)
db.material.belongsToMany(db.assignment, { through: db.material_in_assignment})
db.material.hasMany(db.material_in_assignment)
db.material.belongsToMany(db.topic, { through: db.material_in_topic})
db.material.hasMany(db.material_in_topic)
db.material.belongsToMany(db.submission, { through: db.material_in_submission})
db.material.hasMany(db.material_in_submission)
db.material.belongsToMany(db.feedback, { through: db.material_in_feedback})
db.material.hasMany(db.material_in_feedback)

// Material_In_Assignment
db.material_in_assignment.belongsTo(db.material)
db.material_in_assignment.belongsTo(db.assignment)

// Material_In_Feedback
db.material_in_feedback.belongsTo(db.material)
db.material_in_feedback.belongsTo(db.feedback)

// Material_In_Submission
db.material_in_submission.belongsTo(db.material)
db.material_in_submission.belongsTo(db.submission)

// Material_In_Topic
db.material_in_topic.belongsTo(db.material)
db.material_in_topic.belongsTo(db.topic)

// Sections
db.section.belongsTo(db.status)
db.section.belongsTo(db.user)
db.section.belongsTo(db.course)
db.section.belongsToMany(db.user, { through: db.user_taking_section})
db.section.hasMany(db.user_taking_section)
db.section.hasMany(db.topic)
db.section.hasMany(db.material)

// Status
db.status.hasMany(db.course)
db.status.hasMany(db.course_history)
db.status.hasMany(db.section)
db.status.hasMany(db.topic)

// Submission
db.submission.belongsTo(db.assignment)
db.submission.belongsTo(db.user)
db.submission.belongsTo(db.submission_status)
db.submission.belongsTo(db.grading_status)
db.submission.belongsToMany(db.material, { through: db.material_in_submission})
db.submission.hasOne(db.feedback)
db.submission.hasMany(db.material_in_assignment)

// Submission_Status
db.submission_status.hasMany(db.submission)

// Topic
db.topic.belongsTo(db.status)
db.topic.belongsTo(db.section)
db.topic.belongsToMany(db.material, { through: db.material_in_topic})
db.topic.hasMany(db.material_in_topic)
db.topic.hasMany(db.assignment)

// Users
db.user.belongsTo(db.permission)
db.user.belongsToMany(db.section, { through: db.user_taking_section})
db.user.hasMany(db.course)
db.user.hasMany(db.course_history)
db.user.hasMany(db.user_taking_section)
db.user.hasMany(db.submission)
db.user.hasMany(db.feedback)

// User_Taking_Section
db.user_taking_section.belongsTo(db.user)
db.user_taking_section.belongsTo(db.section)
db.user_taking_section.belongsTo(db.permission)

sequelize.authenticate().then(() => {console.log('Connection has been established successfully.')}).catch(err => {console.log("Database connection failure")})

module.exports = db;
