<template>
    <div class="app-container">
        <el-button type="primary" @click="handleaddCampus">
            {{ $t('universityCampus.addCampus') }}
        </el-button>

        <el-table :data="campusList" style="width: 100%;margin-top:30px;" border max-height="250">
            <el-table-column align="center" label="Nome do Polo" fixed>
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Status" fixed>
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column :data="campusList" align="center" label="Operações" fixed>
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope)">
                        {{ $t('universityCampus.edit') }}
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope)">
                        {{ $t('software.delete') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Polo':'Novo Polo'">
            <el-form ref="campus" :model="campus" label-width="150px" :rules="campusRules" label-position="left">
                <el-form-item label="Nome" prop="name">
                    <el-input ref="name" v-model="campus.name" placeholder="Nome do Polo"/>
                </el-form-item>
                <el-form-item label="Status" prop="status">
                    <el-select ref="status" v-model="campus.status">
                        <el-option value="1" label="Ativo">Ativo</el-option>
                        <el-option value="0" label="Inativo">Inativo</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Estado" prop="state">
                    <el-select v-model="campus.state" required>
                        <el-option
                                v-for="item in stateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Responsável do Polo" prop="responsible_id">
                    <el-select v-model="campus.responsible_id" required>
                        <el-option
                                v-for="item in userList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button type="danger" @click="dialogVisible=false">
                    {{ $t('software.cancel') }}
                </el-button>
                <el-button type="primary" :loading="loading" @click.native.prevent @click="confirmRole">
                    {{ $t('software.confirm') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {deepClone} from '@/utils'
    import {getCampus, addCampus, deleteCampus, updateCampus} from '@/api/university_campus'
    import {getStates} from '@/api/state'
    import {getAdminUsers} from '@/api/user'
    import permission from '@/directive/permission/index.js'

    const defaultCampus = {
        id: '',
        name: '',
        status: '',
        state: '',
        responsible_id: '',
        responsible: []
    }

    const status = {
        1: 'Ativo',
        0: 'Inativo'
    }

    const sendStatus = {
        'Ativo': 1,
        'Inativo': 0
    }
    export default {
        directives: {permission},
        data() {
            const validateEmpty = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('O campo não pode ser vazio!'))
                } else {
                    if (this.checkIfNameExists(value, this.campus.id)) {
                        callback(new Error('Já existe um polo cadastrado com esse nome!'))
                    } else {
                        callback()
                    }
                }
            }
            const validateStatus = (rule, value, callback) => {
                var status_validate = [1, 0, '1', '0', 'Ativo', 'Inativo']
                if (status_validate.includes(value)) {
                    callback()
                } else {
                    callback(new Error('Selecione um status válido.'))
                }
            }
            const validateState = (rule, value, callback) => {
                console.log(value)
                console.log(this.stateList)
                if (!this.stateList[value]) {
                    callback(new Error('Selecione um estado válido.'))
                } else {
                    callback()
                }
            }
            const validateUser = (rule, value, callback) => {
                console.log(value)
                console.log(this.userList)
                if (!this.userList[value]) {
                    callback(new Error('Selecione um usuário válido.'))
                } else {
                    callback()
                }
            }
            return {
                formReady: false,
                loading: false,
                stateList: [],
                userList: [],
                campus: Object.assign({}, defaultCampus),
                dialogVisible: false,
                dialogType: 'new',
                checkStrictly: false,
                campusList: [],
                statusList: Object.assign({}, status),
                sendStatusList: Object.assign({}, sendStatus),
                campusRules: {
                    status: [{required: true, trigger: 'blur', validator: validateStatus}],
                    name: [{required: true, trigger: 'blur', validator: validateEmpty}],
                    //state: [{ required: true, trigger: 'blur', validator: validateState }],
                    //responsible_id: [{ required: true, trigger: 'blur', validator: validateUser }],
                }
            }
        },
        computed: {
            routesData() {
                return this.routes
            }
        },
        created() {
            // Mock: get all routes and roles list from server
            this.getCampus()
            this.getStates()
            this.getUsers()
        },
        methods: {
            closeDialog() {
                this.$refs.campus.resetFields()
                this.dialogVisible = false
            },
            async getCampus() {
                const res = await getCampus()
                this.campusList = this.changeType(res.data)
            },
            async getStates() {
                const sta = await getStates()
                this.stateList = sta.data
            },
            async getUsers() {
                const users = await getAdminUsers()
                this.userList = users.data
            },
            handleaddCampus() {
                this.campus = Object.assign({}, defaultCampus)
                if (this.$refs.tree) {
                    this.$refs.tree.setCheckedNodes([])
                }
                this.dialogType = 'new'
                this.dialogVisible = true
            },
            handleEdit(scope) {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.checkStrictly = true
                this.campus = deepClone(scope.row)
            },
            enableDisable(scope, status) {
                this.dialogType = 'edit'
                this.campus = deepClone(scope.row)
                this.campus.status = status
                this.confirmRole()
            },
            handleDelete({$index, row}) {
                this.$confirm('Deseja remover o polo?', 'Warning', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                })
                    .then(async () => {
                        await deleteCampus(row.id)
                        this.campusList.splice($index, 1)
                        this.$message({
                            type: 'success',
                            message: 'Campus deletado com sucesso!'
                        })
                    })
                    .catch(err => {
                        console.error(err)
                    })
            },
            confirmRole() {
                this.$refs.campus.validate(valid => {
                    const isEdit = this.dialogType === 'edit'
                    if (valid) {
                        this.loading = true
                        if (isEdit) {
                            new Promise((resolve, reject) => {
                                updateCampus(this.campus.id, this.changeSendType(this.campus)).then(response => {
                                    for (let index = 0; index < this.campusList.length; index++) {
                                        if (this.campusList[index].id === this.campus.id) {
                                            this.campusList.splice(index, 1, Object.assign({}, this.changeType(this.campus)))
                                        }
                                    }
                                    resolve()
                                }).catch(error => {
                                    reject(error)
                                })
                            })
                        } else {
                            new Promise((resolve, reject) => {
                                addCampus(this.changeSendType(this.campus)).then(response => {
                                    const {data} = response
                                    this.campus.id = data.key
                                    this.campusList.push(this.changeType(this.campus))
                                    resolve()
                                }).catch(error => {
                                    reject(error)
                                })
                            })
                        }

                        this.loading = false
                        const {name} = this.campus
                        this.dialogVisible = false
                        this.$notify({
                            title: 'Success',
                            dangerouslyUseHTMLString: true,
                            message: `<div>Polo : ${name}</div>`,
                            type: 'success'
                        })
                    } else {
                        console.log('error submit!!')
                        this.loading = false
                        return false
                    }
                })
            },
            changeType(campus) {
                if (Array.isArray(campus)) {
                    for (let index = 0; index < campus.length; index++) {
                        campus[index].status = this.statusList[campus[index].status]
                    }
                    return campus
                }
                campus.status = this.statusList[campus.status]
                return campus
            },
            changeSendType(campus) {
                if (this.sendStatusList[campus.status] || campus.status == 'Inativo') {
                    campus.status = this.sendStatusList[campus.status]
                }
                return campus
            },
            checkIfNameExists(name, campus_id) {
                for (let index = 0; index < this.campusList.length; index++) {
                    // eslint-disable-next-line eqeqeq
                    if (this.campusList[index].name == name && this.campusList[index].id != campus_id) {
                        return true
                    }
                }
                return false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-container {
        .roles-table {
            margin-top: 30px;
        }
        .permission-tree {
            margin-bottom: 30px;
        }
    }
</style>
