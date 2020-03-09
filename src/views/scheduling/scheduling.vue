<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddScheduling">
      {{ $t('scheduling.addScheduling') }}
    </el-button>

    <el-table :data="schedulingList" style="width: 100%;margin-top:30px;" border max-height="250">
      <el-table-column align="center" label="Espaço" fixed>
        <template slot-scope="scope">
          {{ scope.row.space.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status" fixed>
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Professor" fixed>
        <template slot-scope="scope">
          {{ scope.row.professor.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Turma" fixed>
        <template slot-scope="scope">
          {{ scope.row.classes.name }}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Agendamento':'Novo Agendamento'">
      <el-form :model="scheduling" label-width="120px" label-position="left">
        <el-form-item label="Espaço">
          <el-select v-model="scheduling.space.id">
            <el-option value="" label="Sem Sala">Sem Sala</el-option>
            <el-option
              v-for="spaceToShow in this.spaceList"
              :value="spaceToShow.id"
              :label="spaceToShow.name"
            >
              {{ spaceToShow.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tipo" v-if="scheduling.space.id == ''" prop="type">
          <el-select v-model="scheduling.space_item.type">
            <el-option value="ROOM" label="Sala" selected>Sala</el-option>
            <el-option value="LAB" label="Lab">Laboratório</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="(scheduling.space_item.type == 'ROOM' || scheduling.space_item.type == 'Sala') & scheduling.space.id == ''" label="Numero de cadeiras">
          <el-input-number v-model="scheduling.space_item.numberChair" :min="1" placeholder="Quantity of chairs" />
        </el-form-item>
        <el-form-item v-if="(scheduling.space_item.type == 'LAB' || scheduling.space_item.type == 'Laboratorio') & scheduling.space.id == ''" label="Numero de computadores">
          <el-input-number v-model="scheduling.space_item.numberPc" :min="1" placeholder="Quantity of PCs" />
        </el-form-item>
        <el-form-item label="Projetor" v-if="scheduling.space.id == ''" prop="project">
          <el-select v-model="scheduling.space_item.project">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Quadro Inteligente" v-if="scheduling.space.id == ''" prop="smartBoard">
          <el-select v-model="scheduling.space_item.smartBoard">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Quadro" v-if="scheduling.space.id == ''" prop="board">
          <el-select v-model="scheduling.space_item.board">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Turma">
          <el-select v-model="scheduling.classes.id">
            <el-option
              v-for="classesToShow in this.classesList"
              :value="classesToShow.id"
              :label="classesToShow.name"
            >
              {{ classesToShow.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Nome do Professor">
          <el-select v-model="scheduling.professor.id">
            <el-option
              v-for="masterToShow in this.masterList"
              :value="masterToShow.id"
              :label="masterToShow.name"
            >
              {{ masterToShow.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Dia da Semana" prop="weekDay">
          <el-select v-model="scheduling.weekDay">
            <el-option value="1" label="Segunda">Segunda</el-option>
            <el-option value="2" label="Terça">Terça</el-option>
            <el-option value="3" label="Quarta">Quarta</el-option>
            <el-option value="4" label="Quinta">Quinta</el-option>
            <el-option value="5" label="Sexta">Sexta</el-option>
            <el-option value="6" label="Sabado">Sabado</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Data do Agendamento">
          <el-date-picker
            v-model="scheduling.filterdate"
            align="center"
            type="daterange"
            start-placeholder="Data inicial"
            end-placeholder="Data final"
            :picker-date="pickerOptions"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="Horário">
          <el-time-select
            v-model="scheduling.initialtime"
            :picker-options="{
              start: '08:00',
              step: '00:30',
              end: '22:30',
              maxTime: scheduling.endtime
            }"
            placeholder="Hora Inicial"
          />
          <el-time-select
            v-model="scheduling.endtime"
            arrow-control
            :picker-options="{
              start: '08:00',
              step: '00:30',
              end: '22:30',
              minTime: scheduling.initialtime
            }"
            placeholder="Hora Final"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('scheduling.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('scheduling.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getScheduling, addScheduling, deleteScheduling, updateScheduling } from '@/api/scheduling'
import { getCourse } from '@/api/course'
import { getSpaceEnable } from '@/api/space'
import { getClassEnable } from '@/api/classes'
import { getMasterUsers } from '@/api/user'
import { getToken } from '@/utils/auth' // get token from cookie

const defaultScheduling = {
  id: '',
  status: '',
  status_scheduling: '',
  weekDay: '',
  classes: {
    id: '',
    name: ''
  },
  space: {
    id: '',
    name: ''
  },
  space_item: {
    type: '',
    numberPc: '',
    numberChair: '',
    project: '',
    smartBoard: '',
    board: ''
  },
  professor: {
    id: '',
    name: ''
  },
  it_responsable: {
    id: '',
    name: ''
  },
  scheduler: {
    id: '',
    name: ''
  },
  initialtime: '',
  endtime: '',
  filterdate: []
}

const defaultstatus = {
    WAITING_IT:"Esperando resposta do TI",
    WAITING: "Esperando resposta do agendamento",
    ACCEPTED:"Aceito",
    DENIED: "NEGADO"
}

export default {
  data() {
    return {
      scheduling: Object.assign({}, defaultScheduling),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      dialogVisible: false,
      dialogAddLack: false,
      dialogStudent: false,
      dialogType: 'new',
      checkStrictly: false,
      schedulingList: [],
      masterList: [],
      spaceList: [],
      classesList: [],
      token: '',
      id: '',
      status: Object.assign({}, defaultstatus)
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getScheduling()
    this.getSpaceEnable()
    this.getMasterUsers()
    const token_ = getToken()
    this.token = token_.split('-')[0]
    this.id = token_.split('-')[1]
  },
  methods: {
    async getScheduling() {
      const res = await getScheduling()
      this.schedulingList = res.data
        for (let index=0; index < this.schedulingList.length; index++) {
          this.schedulingList[index].status = this.status[this.schedulingList[index].status_scheduling]
        }
    },
    async getMasterUsers() {
      const res = await getMasterUsers()
      this.masterList = res.data
    },
    async getSpaceEnable() {
      const res = await getSpaceEnable()
      this.spaceList = res.data
    },
    async handleaddScheduling() {
      this.scheduling = Object.assign({}, defaultScheduling)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      const space = await getSpaceEnable()
      this.spaceList = space.data
      const classes = await getClassEnable()
      this.classesList = classes.data
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.scheduling = deepClone(scope.row)
    },
    handleAddLack(scope) {
      this.dialogAddLack = true
      this.checkStrictly = true
      this.lack = Object.assign({}, defaultLack)
      this.scheduling = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Deseja remover o agendamento?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteScheduling(row.id)
          this.schedulingList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleDeleteStudents({ $index, row }) {
      this.$confirm('Confirm to remove the student of the class?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteStudentScheduling(row.id, this.scheduling.id)
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
        new Promise((resolve, reject) => {
            addScheduling(this.scheduling).then(response => {
                    const { data } = response
                    console.log(data)
                    this.scheduling.id = data.id
                    this.scheduling.status = this.status[data.status]
                    if (this.scheduling.space.id != '') {
                        for (let index = 0; index < this.spaceList.length; index++) {
                            if (this.scheduling.space.id == this.spaceList[index].id) {
                                this.scheduling.space.name = this.spaceList[index].name
                            }
                        }
                    } else {
                        this.scheduling.space.id = data.spaceModel.id
                        this.scheduling.space.name = data.spaceModel.name
                    }
                    for (let index=0; index < this.classesList.length; index++) {
                        if (this.scheduling.classes.id == this.classesList[index].id) {
                            this.scheduling.classes.name = this.classesList[index].name
                        }
                    }
                    for (let index=0; index < this.masterList.length; index++) {
                        if (this.scheduling.professor.id == this.masterList[index].id) {
                            this.scheduling.professor.name = this.masterList[index].name
                        }
                    }
                    this.scheduling.status = this.status[data.status]
                    console.log(this.scheduling)
                    this.schedulingList.push(this.scheduling)
                console.log(this.schedulingList)
                this.$notify({
                    title: 'Success',
                    dangerouslyUseHTMLString: true,
                    message: `<div>Scheduling: ${name}</div>`,
                    type: 'success'
                })
                }
            ).catch(error => {
                const { data } = error
                console.log(data)
                reject(error)
            })
        })
      this.dialogVisible = false
    },
    async confirmLack() {
      this.lack.scheduling.id = this.scheduling.id
      this.lack.master.id = this.scheduling.master.id
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
