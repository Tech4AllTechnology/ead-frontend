<template>
    <div class="app-container">
        <el-button type="primary" @click="handleaddClass">
            {{ $t('classes.addClass') }}
        </el-button>

        <el-table :data="classesList" style="width: 100%;margin-top:30px;" border>
            <el-table-column label="Nome da Turma" align="center" fixed>
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>Turma: {{ scope.row.name }}</p>
                        <p>Ano: {{ scope.row.year }}</p>
                        <p v-if="scope.row.shift == 1 || scope.row.shift == '1' || scope.row.shift == 'Manhã'">Turno:
                            Manhã</p>
                        <p v-if="scope.row.shift == 2 || scope.row.shift == '2' || scope.row.shift == 'Tarde'">Turno:
                            Tarde</p>
                        <p v-if="scope.row.shift == 3 || scope.row.shift == '3' || scope.row.shift == 'Noite'">Turno:
                            Noite</p>

                        <p v-if="scope.row.semester == 1 || scope.row.semester == '1' || scope.row.semester == 'Primeiro'">
                            Semestre: Primeiro</p>
                        <p v-if="scope.row.semester == 2 || scope.row.semester == '2' || scope.row.semester == 'Segundo'">
                            Semestre: Segundo</p>
                        <p v-if="scope.row.semester == 3 || scope.row.semester == '3' || scope.row.semester == 'Anual'">
                            Semestre: Anual</p>

                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.name }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="Status" align="center" fixed>
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>Turma: {{ scope.row.name }}</p>
                        <p>Ano: {{ scope.row.year }}</p>
                        <p v-if="scope.row.shift == 1 || scope.row.shift == '1' || scope.row.shift == 'Manhã'">Turno:
                            Manhã</p>
                        <p v-if="scope.row.shift == 2 || scope.row.shift == '2' || scope.row.shift == 'Tarde'">Turno:
                            Tarde</p>
                        <p v-if="scope.row.shift == 3 || scope.row.shift == '3' || scope.row.shift == 'Noite'">Turno:
                            Noite</p>

                        <p v-if="scope.row.semester == 1 || scope.row.semester == '1' || scope.row.semester == 'Primeiro'">
                            Semestre: Primeiro</p>
                        <p v-if="scope.row.semester == 2 || scope.row.semester == '2' || scope.row.semester == 'Segundo'">
                            Semestre: Segundo</p>
                        <p v-if="scope.row.semester == 3 || scope.row.semester == '3' || scope.row.semester == 'Anual'">
                            Semestre: Anual</p>

                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.status }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="Matéria" align="center" fixed>
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>Turma: {{ scope.row.name }}</p>
                        <p>Ano: {{ scope.row.year }}</p>
                        <p v-if="scope.row.shift == 1 || scope.row.shift == '1' || scope.row.shift == 'Manhã'">Turno:
                            Manhã</p>
                        <p v-if="scope.row.shift == 2 || scope.row.shift == '2' || scope.row.shift == 'Tarde'">Turno:
                            Tarde</p>
                        <p v-if="scope.row.shift == 3 || scope.row.shift == '3' || scope.row.shift == 'Noite'">Turno:
                            Noite</p>

                        <p v-if="scope.row.semester == 1 || scope.row.semester == '1' || scope.row.semester == 'Primeiro'">
                            Semestre: Primeiro</p>
                        <p v-if="scope.row.semester == 2 || scope.row.semester == '2' || scope.row.semester == 'Segundo'">
                            Semestre: Segundo</p>
                        <p v-if="scope.row.semester == 3 || scope.row.semester == '3' || scope.row.semester == 'Anual'">
                            Semestre: Anual</p>

                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.course.name }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="Professor" align="center" fixed>
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>Turma: {{ scope.row.name }}</p>
                        <p>Ano: {{ scope.row.year }}</p>
                        <p v-if="scope.row.shift == 1 || scope.row.shift == '1' || scope.row.shift == 'Manhã'">Turno:
                            Manhã</p>
                        <p v-if="scope.row.shift == 2 || scope.row.shift == '2' || scope.row.shift == 'Tarde'">Turno:
                            Tarde</p>
                        <p v-if="scope.row.shift == 3 || scope.row.shift == '3' || scope.row.shift == 'Noite'">Turno:
                            Noite</p>

                        <p v-if="scope.row.semester == 1 || scope.row.semester == '1' || scope.row.semester == 'Primeiro'">
                            Semestre: Primeiro</p>
                        <p v-if="scope.row.semester == 2 || scope.row.semester == '2' || scope.row.semester == 'Segundo'">
                            Semestre: Segundo</p>
                        <p v-if="scope.row.semester == 3 || scope.row.semester == '3' || scope.row.semester == 'Anual'">
                            Semestre: Anual</p>

                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.master.name }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Operações" width="400" fixed>
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope)">
                        {{ $t('classes.edit') }}
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope)">
                        {{ $t('classes.delete') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Turma':'Nova Turma'">
            <el-form ref="classes" :model="classes" :rules="classesRules" label-width="120px" label-position="left">
                <el-form-item label="Nome" prop="name" v-if="dialogType==='edit'">
                    <el-input v-model="classes.name" placeholder="Nome" disabled/>
                </el-form-item>
                <el-form-item label="Nome" prop="name" v-if="dialogType==='new'">
                    <el-input v-model="classes.name" placeholder="Nome será criado pelo Sistema" disabled/>
                </el-form-item>
                <el-form-item label="Status" prop="status">
                    <el-select v-model="classes.status">
                        <el-option value="1" label="Ativo">Ativo</el-option>
                        <el-option value="0" label="Inativo">Inativo</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Matéria" prop="course.id">
                    <el-select v-model="classes.course.id">
                        <el-option
                                v-for="courseToShow in this.courseList"
                                :key="courseToShow.id"
                                :label="courseToShow.name"
                                :value="courseToShow.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Professor" prop="master.id">
                    <el-select v-model="classes.master.id">
                        <el-option
                                v-for="masterToShow in this.masterList"
                                :key="masterToShow.id"
                                :label="masterToShow.name"
                                :value="masterToShow.id"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="Turno" prop="shift">
                    <el-select v-model="classes.shift">
                        <el-option
                                v-for="shiftShow in this.shift"
                                :key="shiftShow.id"
                                :label="shiftShow.name"
                                :value="shiftShow.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Semestre" prop="semester">
                    <el-select v-model="classes.semester">
                        <el-option
                                v-for="period in this.periods"
                                :key="period.id"
                                :label="period.name"
                                :value="period.id"
                        />
                    </el-select>
                </el-form-item>


                <el-form-item label="Inicio/Fim Turma" prop="year">
                    <el-date-picker
                            v-model="classes.filterDate"
                            type="daterange"
                            unlink-panels
                            start-placeholder="Data Inicial"
                            end-placeholder="Data Final"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            format="dd/MM/yyyy"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="Horário">
                    <el-time-select v-model="classes.initialTime"
                                    :picker-options="{
                                start: '07:00',
                                step: '00:30',
                                end: '23:30',
                                maxTime: classes.endTime
                                }"
                                    placeholder="Hora Inicial"
                    />
                    <el-time-select
                            v-model="classes.endTime"
                            arrow-control
                            :picker-options="{
                                start: '07:00',
                                step: '00:30',
                                end: '23:30',
                                minTime: classes.initialTime
                                }"
                            placeholder="Hora Final"
                    />
                </el-form-item>


                <el-form-item label="Dias da semana" prop="program">
                    <div v-for="(line, index) in classes.weekdays" :key="index" class="row" style="margin-top: 10px">
                        <div class="row">
                            <el-select v-model="line.id" label="Dias da Semana">
                                <el-option
                                        v-for="item in weekDayList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                />
                            </el-select>
                            <el-button type="danger" round icon="el-icon-delete" @click="removeLine(index)"/>
                            <el-button v-if="index + 1 === classes.weekdays.length" type="primary" round
                                       icon="el-icon-plus" @click="addLine"/>
                        </div>
                    </div>
                </el-form-item>


            </el-form>
            <div style="text-align:right;">
                <el-button type="danger" @click="dialogVisible=false">
                    {{ $t('classes.cancel') }}
                </el-button>
                <el-button type="primary" @click="confirmRole">
                    {{ $t('classes.confirm') }}
                </el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogAddLack" :title="'Add Lack'">
            <el-form :model="lack" label-width="120px" label-position="left">
                <el-form-item label="Master Name">
                    <el-input v-model="classes.master.name" disabled="true"/>
                </el-form-item>
                <el-form-item label="Lack">
                    <el-date-picker v-model="lack.date" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd"/>
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button type="danger" @click="dialogAddLack=false">
                    {{ $t('classes.cancel') }}
                </el-button>
                <el-button type="primary" @click="confirmLack">
                    {{ $t('classes.confirm') }}
                </el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogStudent" :title="'Students'">
            <el-form :model="classes" label-width="80px" label-position="left">
                <el-table :data="studentsClassList" style="width: 100%;margin-top:30px;" border>
                    <el-table-column align="center" label="Space Name" width="220">
                        <template slot-scope="studentsClassList">
                            {{ studentsClassListScope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :data="studentsClassList" label="Operations">
                        <template slot-scope="studentsClassList">
                            <el-button type="danger" size="small" @click="handleDeleteStudents(studentsClassList)">
                                {{ $t('space.delete') }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-table :data="studentsList" style="width: 100%;margin-top:30px;" border>
                    <el-table-column align="center" label="Space Name" width="220">
                        <template slot-scope="studentsListScope">
                            {{ studentsListScope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :data="studentsList" label="Operations">
                        <template slot-scope="studentsListScope">
                            <el-button type="submit" size="small" @click="handleAddStudentClass(studentsListScope)">
                                {{ $t('software.addSoftware') }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-form>
            <div style="text-align:right; margin-top: 10px">
                <el-button type="danger" @click="dialogStudent=false">
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {deepClone} from '@/utils'
    import {getClass, addClass, deleteClass, updateClass, addLack} from '@/api/classes'
    import {getCourse} from '@/api/course'
    import {getMasterUsers} from '@/api/user'

    const defaultClass = {
        id: '',
        status: '',
        name: '',
        course: {
            id: '',
            name: ''
        },
        master: {
            id: '',
            name: ''
        },
        shift: '',
        semester: '',
        filterDate: [],
        weekdays: [],
        initialTime: '',
        endTime: '',
    }

    const defaultCourse = {
        id: '',
        name: ''
    }

    const defaultMaster = {
        id: '',
        name: ''
    }

    const defaultStudent = {
        id: '',
        name: ''
    }

    const defaultLack = {
        master: {
            id: ''
        },
        date: '',
        classes: {
            id: ''
        }
    }

    const status = {
        1: 'Ativo',
        0: 'Inativo'
    }

    const sendStatus = {
        'Ativo': 1,
        'Inativo': 0
    }

    const shift = [
        {
            id: 'MORNING',
            name: 'Manhã'
        },
        {
            id: 'AFTERNOON',
            name: 'Tarde'
        },
        {
            id: 'NIGHT',
            name: 'Noite'
        },
        {
            id: 'ONLINE',
            name: 'Online'
        },
        {
            id: 'NO_SHIFT',
            name: 'Sem Turno'
        }
    ]

    const periods = [
        {
            id: 'FIRST_SEMESTER',
            name: 'Primeiro Semestre'
        },
        {
            id: 'SECOND_SEMESTER',
            name: 'Segundo Semestre'
        },
        {
            id: 'NO_SEMESTER',
            name: 'Sem Semestre'
        }
    ]

    const weekDays = [
        {
            id: 'MONDAY',
            name: 'Segunda-feira'
        },
        {
            id: 'TUESDAY',
            name: 'Terça-feira'
        },
        {
            id: 'WEDNESDAY',
            name: 'Quarta-feira'
        },
        {
            id: 'THURSDAY',
            name: 'Quinta-feira'
        },
        {
            id: 'FRIDAY',
            name: 'Sexta-feira'
        },
        {
            id: 'SATURDAY',
            name: 'Sábado'
        },
        {
            id: 'SUNDAY',
            name: 'Domingo'
        }
    ]

    export default {
        data() {
            const validateStatus = (rule, value, callback) => {
                var statusValidate = [1, 0, '1', '0', 'Ativo', 'Inativo']
                if (statusValidate.includes(value)) {
                    callback()
                } else {
                    callback(new Error('Selecione um status válido.'))
                }
            }
            const validateName = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('O campo não pode ser vazio.'))
                } else {
                    if (this.checkIfNameExists(value, this.classes.id)) {
                        callback(new Error('Já existe um espaço cadastrado com esse nome.'))
                    } else {
                        callback()
                    }
                }
            }
            const validateEmpty = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('O campo não pode ser vazio.'))
                } else {
                    callback()
                }
            }
            return {
                classes: Object.assign({}, defaultClass),
                courses: Object.assign({}, defaultCourse),
                masters: Object.assign({}, defaultMaster),
                lack: Object.assign({}, defaultLack),
                students: Object.assign({}, defaultStudent),
                statusList: Object.assign({}, status),
                sendStatusList: Object.assign({}, sendStatus),
                shift: Object.assign({}, shift),
                periods: Object.assign({}, periods),
                weekDayList: Object.assign({}, weekDays),
                dialogVisible: false,
                dialogAddLack: false,
                dialogStudent: false,
                dialogType: 'new',
                checkStrictly: false,
                classesList: [],
                courseList: [],
                masterList: [],
                studentsList: [],
                studentsClassList: [],
                classesRules: {
                    status: [{required: true, trigger: 'blur', validator: validateStatus}],
                    shift: [{required: true, trigger: 'blur', validator: validateEmpty}],
                    credit: [{required: true, trigger: 'blur', validator: validateEmpty}],
                    semester: [{required: true, trigger: 'blur', validator: validateEmpty}],
                    'master.id': [{required: true, trigger: 'blur', validator: validateEmpty}],
                    'course.id': [{required: true, trigger: 'blur', validator: validateEmpty}]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < (Date.now() - 3600 * 1000 * 24);
                    },
                    shortcuts: [{
                        text: 'Próxima semana',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Próximo mês',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Próximos 6 meses',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 180);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
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
            this.getClass()
            this.getMaster()
            this.getCourses()
        },
        methods: {
            async getClass() {
                const res = await getClass()
                this.classesList = this.changeType(res.data)
            },
            async getMaster() {
                const response = await getMasterUsers()
                this.masterList = response.data
            },
            async getCourses() {
                const res = await getCourse()
                this.courseList = res.data
            },
            async handleaddClass() {
                this.classes = Object.assign({}, defaultClass)
                if (this.$refs.tree) {
                    this.$refs.tree.setCheckedNodes([])
                }
                this.addLine()
                this.dialogType = 'new'
                this.dialogVisible = true
            },
            async handleAddStudent() {
                this.classes = deepClone(scope.row)
                const students = await getStudents()
                this.studentsList = students.data
                const studentsClass = await getStudentClass(this.classes.id)
                this.studentsClassList = studentsClass.data
                this.dialogVisible = true
            },
            handleEdit(scope) {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.checkStrictly = true
                this.classes = deepClone(scope.row)
                this.addLine()
            },
            handleAddLack(scope) {
                this.dialogAddLack = true
                this.checkStrictly = true
                this.lack = Object.assign({}, defaultLack)
                this.classes = deepClone(scope.row)
            },
            handleDelete({$index, row}) {
                this.$confirm('Deseja remover a turma?', 'Warning', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                })
                    .then(async () => {
                        await deleteClass(row.id)
                        this.classesList.splice($index, 1)
                        this.$message({
                            type: 'success',
                            message: 'Removido com sucesso!'
                        })
                    })
                    .catch(err => {
                        console.error(err)
                    })
            },
            handleDeleteStudents({$index, row}) {
                this.$confirm('Confirm to remove the student of the class?', 'Warning', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                })
                    .then(async () => {
                        await deleteStudentClass(row.id, this.classes.id)
                        this.softwareList.push(row)
                        this.softwareSpaceList.splice($index, 1)
                        this.$message({
                            type: 'success',
                            message: 'Delete succed!'
                        })
                    })
                    .catch(err => {
                        console.error(err)
                    })
            },
            confirmRole() {
                this.$refs.classes.validate(valid => {
                    const isEdit = this.dialogType === 'edit'
                    if (valid) {
                        for (let index = 0; index < this.masterList.length; index++) {
                            if (this.classes.master.id === this.masterList[index].id) {
                                this.classes.master.name = this.masterList[index].name
                                break
                            }
                        }

                        for (let index = 0; index < this.courseList.length; index++) {
                            if (this.classes.course.id === this.courseList[index].id) {
                                this.classes.course.name = this.courseList[index].name
                                break
                            }
                        }

                        this.formReady = true
                        this.loading = true
                        if (isEdit) {
                            new Promise((resolve, reject) => {
                                updateClass(this.classes.id, this.changeSendType(this.classes)).then(response => {
                                    for (let index = 0; index < this.classesList.length; index++) {
                                        if (this.classesList[index].id === this.classes.id) {
                                            this.classesList.splice(index, 1, Object.assign({}, this.changeType(this.classes)))
                                            break
                                        }
                                    }
                                    resolve()
                                }).catch(error => {
                                    reject(error)
                                })
                            })
                        } else {
                            new Promise((resolve, reject) => {
                                addClass(this.changeSendType(this.classes)).then(response => {
                                    const {data} = response
                                    this.classes.id = data.key
                                    this.classes.name = data.name
                                    this.classesList.push(this.changeType(this.classes))
                                    resolve()
                                }).catch(error => {
                                    reject(error)
                                })
                            })
                        }
                        this.loading = false

                        const {name} = this.classes
                        this.dialogVisible = false
                        this.$notify({
                            title: 'Success',
                            dangerouslyUseHTMLString: true,
                            message: `<div>Matéria: ${name}</div>`,
                            type: 'success'
                        })
                    } else {
                        this.formReady = false
                        this.loading = false
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            async confirmLack() {
                this.lack.classes.id = this.classes.id
                this.lack.master.id = this.classes.master.id
                console.log(this.lack)
                await addLack(this.lack)
                this.dialogAddLack = false
                this.$notify({
                    title: 'Success',
                    dangerouslyUseHTMLString: true,
                    message: `
            <div>Lack added</div>
          `,
                    type: 'success'
                })
            },
            changeType(clazz) {
                if (Array.isArray(clazz)) {
                    for (let index = 0; index < clazz.length; index++) {
                        clazz[index].status = this.statusList[clazz[index].status]
                    }
                    return clazz
                }
                clazz.status = this.statusList[clazz.status]
                return clazz
            },
            changeSendType(clazz) {
                if (this.sendStatusList[clazz.status] || clazz.status == 'Inativo') {
                    clazz.status = this.sendStatusList[clazz.status]
                }
                return clazz
            },
            checkIfNameExists(name, classes_id) {
                for (let index = 0; index < this.classesList.length; index++) {
                    if (this.classesList[index].name === name && this.classesList[index].id !== classes_id) {
                        return true
                    }
                }
                return false
            },

            addLine() {
                console.log(this.classes.weekdays)
                const checkEmptyLines = this.classes.weekdays.filter(line => line.id === null)
                if (checkEmptyLines.length >= 1 && this.classes.weekdays.length > 0) {
                    return
                }
                this.classes.weekdays.push({
                    id: null,
                    name: null
                })
            },
            removeLine(lineId) {
                console.log(this.classes.weekdays)
                console.log(lineId)
                if (this.classes.weekdays.length > 1) {
                    console.log('Entrou no item')
                    this.classes.weekdays.splice(lineId, 1)
                }
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
