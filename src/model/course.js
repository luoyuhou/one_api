module.exports = class extends think.Model {
  getAccess(uid, cid, prefix) {
    return this.join({table: 'course_user', join: 'left', on:['id', 'course_id']})
      .where(`(${prefix}course_user.user_id=${uid} AND ${prefix}course_user.course_id=${cid}) or (${prefix}course.id=${cid} AND ${prefix}course.preview=1)`).field(`${prefix}course.*, ${prefix}course_user.id as access`).find();
  }

  getList(uid, cid, prefix) {
    return this.join({table: 'course_user', join: 'left', on: ['pid', 'course_id']})
      .join({table: 'course_user_process', join: 'left', on: ['id', 'course_id']}).where(`(${prefix}course_user.user_id=${uid} AND ${prefix}course_user.course_id=${cid}) or (${prefix}course.pid=${cid} AND ${prefix}course.preview=1)`)
      .field(`${prefix}course.*,${prefix}course_user_process.id as study`).order('sort ASC, id ASC').select();
  }
};
