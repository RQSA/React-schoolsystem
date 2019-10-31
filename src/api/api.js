import Server from './server';

class API extends Server {

    /**
     * 获取注册信息接口
     * @url: http://localhost:8888/student/depatment
     * 返回status为200表示成功
     * @method: get
     * @return: promise
     */
    async getRegister (config = {}) {
        try {
            let result = await this.myAxios('get', '/student/depatment', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 注册接口
     * @url: http://localhost:8888/student/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async Register (config = {}) {
        try {
            let result = await this.myAxios('post', '/student/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '注册失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 登录接口
     * @url: http://localhost:8888/login/dologin
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async Login (config = {}) {
        try {
            let result = await this.myAxios('post', '/login/dologin', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '登陆失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 获取登录信息接口
     * @url: http://localhost:8888/login/info
     * 返回status为200表示成功
     * @method: get
     * @return: promise
     */
    async getLoginInfo (config = {}) {
        try {
            let result = await this.myAxios('get', '/login/info', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '登陆超时',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
    *登出接口
    * @url: http://localhost:8888/login/signout
    * 返回status为200表示成功
    * @method: get
    * @return: promise
    */
    async signOut (config = {}) {
        try {
            let result = await this.myAxios('get', '/login/signout', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '登出失败失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //************************************ 

    /**
    *修改信息接口
    * @url: http://localhost:8888/{admin, instructor, student}/info
    * 返回status为200表示成功
    * @method: put
    * @return: promise
    */
    async ModifyInfo (type, config = {}) {
        try {
            let result = await this.myAxios('put', `/${type}/info`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '修改个人信息失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
    *修改信息接口
    * @url: http://localhost:8888/{admin, instructor, student}/info
    * 返回status为200表示成功
    * @method: put
    * @return: promise
    */
   async ModifyPassword (type, config = {}) {
    try {
        let result = await this.myAxios('put', `/${type}/password`, config);
        if(result.status !== 200) {
            return {
                status: 0,
                msg: result.msg || '修改密码失败',
                data: {},
            }
        }
        return result;
    } catch(error) {
        throw error;
    }
}

    //************************************ 

    /**
     * 获取公告列表接口
     * @url: http://localhost:8888/{amdin, instructor, student}/notice/list
     * 返回status为200表示成功
     * offset 跳过的条数
     * limit 返回的条数
     * @method: get
     * @return: promise
     */
    async getNoticeList (type, config = {}) {
        try {
            let result = await this.myAxios('get', `/${type}/notice/list`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取公告列表失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 新增公告接口
     * @url: http://localhost:8888/admin/notice/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async addNotice (config = {}) {
        try {
            let result = await this.myAxios('post', '/admin/notice/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '新建公告失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 删除公告接口
     * @url: http://localhost:8888/admin/notice/list/:id
     * 返回status为200表示成功
     * @method: delete
     * @return: promise
     */
    async deleteNotice (notice_id, config = {}) {
        try {
            let result = await this.myAxios('delete', `/admin/notice/list/${notice_id}`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除公告失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 修改公告接口
     * @url: http://localhost:8888/admin/notice/list
     * 返回status为200表示成功
     * @method: put
     * @return: promise
     */
    async modifyNotice (config = {}) {
        try {
            let result = await this.myAxios('put', '/admin/notice/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除公告失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //***********************************************

    /**
     * 获取辅导员列表接口
     * @url: http://localhost:8888/admin/instructor/list
     * 返回status为200表示成功
     * offset 跳过的条数
     * limit 返回的条数
     * @method: get
     * @return: promise
     */
    async getInstructorList (config = {}) {
        try {
            let result = await this.myAxios('get', '/admin/instructor/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取辅导员列表失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 新增辅导员接口
     * @url: http://localhost:8888/admin/instructor/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async addInstructor (config = {}) {
        try {
            let result = await this.myAxios('post', '/admin/instructor/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '新建辅导员失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 删除辅导员接口
     * @url: http://localhost:8888/admin/instructor/list/:id
     * 返回status为200表示成功
     * @method: delete
     * @return: promise
     */
    async deleteInstructor (instructor_id, config = {}) {
        try {
            let result = await this.myAxios('delete', `/admin/instructor/list/${instructor_id}`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除辅导员失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 修改辅导员接口
     * @url: http://localhost:8888/admin/instructor/list
     * 返回status为200表示成功
     * @method: put
     * @return: promise
     */
    async modifyInstructor (config = {}) {
        try {
            let result = await this.myAxios('put', '/admin/instructor/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除辅导员失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }
    
    //***********************************************

    /**
     * 获取系部列表接口
     * @url: http://localhost:8888/admin/depatment/list
     * 返回status为200表示成功
     * offset 跳过的条数
     * limit 返回的条数
     * @method: get
     * @return: promise
     */
    async getDepartmentList (config = {}) {
        try {
            let result = await this.myAxios('get', '/admin/depatment/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取系部列表失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 新增系部接口
     * @url: http://localhost:8888/admin/depatment/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async addDepartment (config = {}) {
        try {
            let result = await this.myAxios('post', '/admin/depatment/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '新建系部失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 删除系部接口
     * @url: http://localhost:8888/admin/depatment/list/:id
     * 返回status为200表示成功
     * @method: delete
     * @return: promise
     */
    async deleteDepartment (department_id, config = {}) {
        try {
            let result = await this.myAxios('delete', `/admin/depatment/list/${department_id}`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除系部失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 修改系部接口
     * @url: http://localhost:8888/admin/depatment/list
     * 返回status为200表示成功
     * @method: put
     * @return: promise
     */
    async modifyDepartment (config = {}) {
        try {
            let result = await this.myAxios('put', '/admin/depatment/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除系部失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //***********************************************

    /**
     * 获取专业列表接口
     * @url: http://localhost:8888/admin/special/list
     * 返回status为200表示成功
     * offset 跳过的条数
     * limit 返回的条数
     * @method: get
     * @return: promise
     */
    async getMajorList (config = {}) {
        try {
            let result = await this.myAxios('get', '/admin/special/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取专业列表失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 新增专业接口
     * @url: http://localhost:8888/admin/special/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async addMajor (config = {}) {
        try {
            let result = await this.myAxios('post', '/admin/special/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '新建专业失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 删除专业接口
     * @url: http://localhost:8888/admin/special/list/:id
     * 返回status为200表示成功
     * @method: delete
     * @return: promise
     */
    async deleteMajor (special_id, config = {}) {
        try {
            let result = await this.myAxios('delete', `/admin/special/list/${special_id}`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除专业失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 修改专业接口
     * @url: http://localhost:8888/admin/special/list
     * 返回status为200表示成功
     * @method: put
     * @return: promise
     */
    async modifyMajor (config = {}) {
        try {
            let result = await this.myAxios('put', '/admin/special/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除专业失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //***********************************************

    /**
     * 获取班级列表接口
     * @url: http://localhost:8888/admin/class/list
     * 返回status为200表示成功
     * offset 跳过的条数
     * limit 返回的条数
     * @method: get
     * @return: promise
     */
    async getClassList (config = {}) {
        try {
            let result = await this.myAxios('get', '/admin/class/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取班级列表失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 新增班级接口
     * @url: http://localhost:8888/admin/class/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async addClass (config = {}) {
        try {
            let result = await this.myAxios('post', '/admin/class/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '新建班级失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 删除班级接口
     * @url: http://localhost:8888/admin/class/list/:id
     * 返回status为200表示成功
     * @method: delete
     * @return: promise
     */
    async deleteClass (class_id, config = {}) {
        try {
            let result = await this.myAxios('delete', `/admin/class/list/${class_id}`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除班级失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 修改班级接口
     * @url: http://localhost:8888/admin/class/list
     * 返回status为200表示成功
     * @method: put
     * @return: promise
     */
    async modifyClass (config = {}) {
        try {
            let result = await this.myAxios('put', '/admin/class/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除班级失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //***********************************************

    /**
     * 获取资助金类型列表接口
     * @url: http://localhost:8888/{admin, insturtor, student}/type/list
     * 返回status为200表示成功
     * offset 跳过的条数
     * limit 返回的条数
     * @method: get
     * @return: promise
     */
    async getGrantsList (type, config = {}) {
        try {
            let result = await this.myAxios('get', `/${type}/type/list`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取资助金类型列表失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 新增资助金类型接口
     * @url: http://localhost:8888/admin/type/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async addGrants (config = {}) {
        try {
            let result = await this.myAxios('post', '/admin/type/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '新建资助金类型失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 删除资助金类型接口
     * @url: http://localhost:8888/admin/type/list/:id
     * 返回status为200表示成功
     * @method: delete
     * @return: promise
     */
    async deleteGrants (type_id, config = {}) {
        try {
            let result = await this.myAxios('delete', `/admin/type/list/${type_id}`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除资助金类型失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 修改资助金类型接口
     * @url: http://localhost:8888/admin/type/list
     * 返回status为200表示成功
     * @method: put
     * @return: promise
     */
    async modifyGrants (config = {}) {
        try {
            let result = await this.myAxios('put', '/admin/type/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除资助金类型失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }


    //***********************************************

    /**
     * 获取审核标准列表接口
     * @url: http://localhost:8888/{admin, instructor, student}/standard/list
     * 返回status为200表示成功
     * offset 跳过的条数
     * limit 返回的条数
     * @method: get
     * @return: promise
     */
    async getStandardList (type, config = {}) {
        try {
            let result = await this.myAxios('get', `/${type}/standard/list`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取审核标准列表失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 新增审核标准接口
     * @url: http://localhost:8888/admin/standard/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async addStandard (config = {}) {
        try {
            let result = await this.myAxios('post', '/admin/standard/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '新建审核标准失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 删除审核标准接口
     * @url: http://localhost:8888/admin/standard/list/:id
     * 返回status为200表示成功
     * @method: delete
     * @return: promise
     */
    async deleteStandard (standard_id, config = {}) {
        try {
            let result = await this.myAxios('delete', `/admin/standard/list/${standard_id}`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除审核标准失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 修改审核标准接口
     * @url: http://localhost:8888/admin/standard/list
     * 返回status为200表示成功
     * @method: put
     * @return: promise
     */
    async modifyStandard (config = {}) {
        try {
            let result = await this.myAxios('put', '/admin/standard/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除审核标准失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //***********************************************

    /**
     * 获取贫困生列表接口
     * @url: http://localhost:8888/admin/student/list
     * 返回status为200表示成功
     * offset 跳过的条数
     * limit 返回的条数
     * @method: get
     * @return: promise
     */
    async getStudentList (config = {}) {
        try {
            let result = await this.myAxios('get', '/admin/student/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取贫困生列表失败',
                    data: {},
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 新增贫困生接口
     * @url: http://localhost:8888/admin/student/list
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async addStudent (config = {}) {
        try {
            let result = await this.myAxios('post', '/admin/student/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '新建贫困生失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 删除贫困生接口
     * @url: http://localhost:8888/admin/student/list/:id
     * 返回status为200表示成功
     * @method: delete
     * @return: promise
     */
    async deleteStudent (student_id, config = {}) {
        try {
            let result = await this.myAxios('delete', `/admin/student/list/${student_id}`, config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除贫困生失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 修改贫困生接口
     * @url: http://localhost:8888/admin/student/list
     * 返回status为200表示成功
     * @method: put
     * @return: promise
     */
    async modifyStudent (config = {}) {
        try {
            let result = await this.myAxios('put', '/admin/student/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '删除贫困生失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //*********************************************** */

     /**
     * 贫困生申请状态接口
     * @url: http://localhost:8888/student/apply/list
     * 返回status为200表示成功
     * @method: get
     * @return: promise
     */
    async applyStatus (config = {}) {
        try {
            let result = await this.myAxios('get', '/student/apply/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取状态失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 贫困生提交申请接口
     * @url: http://localhost:8888/student/apply/list
     * 返回status为200表示成功
     * @method: {post， put}
     * @return: promise
     */
    async addApply (method, config = {}) {
        try {
            let result = await this.myAxios(`${method}`, '/student/apply/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '提交申请失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //********************************* */

    /**
     * 汇总统计接口
     * @url: http://localhost:8888/apply/total
     * 返回status为200表示成功
     * @method: get
     * @return: promise
     */
    async getStatic (config = {}) {
        try {
            let result = await this.myAxios('get', '/apply/total', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取统计数据失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //********************************* */

    /**
     * 获取资助生名单接口
     * @url: http://localhost:8888/apply/list
     * 返回status为200表示成功
     * @method: get
     * @return: promise
     */
    async getNeedyList (config = {}) {
        try {
            let result = await this.myAxios('get', '/apply/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取资助生列表失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //********************************* */

    /**
     * 获取初审名单接口
     * @url: http://localhost:8888/instructor/apply/list
     * 返回status为200表示成功
     * @method: get
     * @return: promise
     */
    async getFirstList (config = {}) {
        try {
            let result = await this.myAxios('get', '/instructor/apply/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取初审列表失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 初审通过和不通过接口
     * @url: http://localhost:8888/instructor/apply/status
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async modifyFirst (config = {}) {
        try {
            let result = await this.myAxios('post', 'instructor/apply/status', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '审核失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    //********************************* */

    /**
     * 获取复审名单接口
     * @url: http://localhost:8888/amdin/apply/list
     * 返回status为200表示成功
     * @method: get
     * @return: promise
     */
    async getSecondList (config = {}) {
        try {
            let result = await this.myAxios('get', '/admin/apply/list', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '获取复审列表失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * 复审通过和不通过接口
     * @url: http://localhost:8888/admin/apply/status
     * 返回status为200表示成功
     * @method: post
     * @return: promise
     */
    async modifySecond (config = {}) {
        try {
            let result = await this.myAxios('post', 'admin/apply/status', config);
            if(result.status !== 200) {
                return {
                    status: 0,
                    msg: result.msg || '复审失败',
                }
            }
            return result;
        } catch(error) {
            throw error;
        }
    }

    








}

export default new API();