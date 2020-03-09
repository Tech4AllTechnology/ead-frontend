<template>
  <div class="app-container">

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
      <el-table-column align="center" label="Operações" width="300" fixed>
        <template slot-scope="scope">
          <el-button v-if="checkSchedulings.includes(token)" type="primary" size="small" @click="handleEditAuthorizer(scope)">
            {{ $t('scheduling.checkSchedulings') }}
          </el-button>
          <el-button v-if="checkITSchedulings.includes(token)" type="danger" size="small" @click="handleEditIT(scope)">
            {{ $t('scheduling.checkITSchedulings') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogAuthorizer" :title="'Agendamentos Pendentes'">
      <el-form :model="sendScheduling" label-width="120px" label-position="left">
        <el-form-item label="Espaço">
          <el-select v-model="sendScheduling.status">
            <el-option value="ACCEPTED" label="Aceitar">Aceitar</el-option>
            <el-option value="DENIED" label="Negar">Negar</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="sendScheduling.status == 'DENIED'" label="Motivo">
          <el-input v-model="sendScheduling.message" type="textarea" :rows="2" placeholder="Insira o motivo" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogAuthorizer=false">
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
import { getScheduling, addScheduling, deleteScheduling, updateScheduling, getSchedulingByType } from '@/api/scheduling'
import { getCourse } from '@/api/course'
import { getSpaceEnable } from '@/api/space'
import { getClassEnable } from '@/api/classes'
import { getMasterUsers } from '@/api/user'
import { getToken } from '@/utils/auth' // get token from cookie

const defaultScheduling = {
  id: '',
  status: '',
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

const defaultSendScheduling = {
  status: '',
  type: '',
  user_id: '',
  message: ''
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
      dialogAuthorizer: false,
      dialogAddLack: false,
      dialogStudent: false,
      dialogType: 'new',
      checkStrictly: false,
      schedulingList: [],
      masterList: [],
      spaceList: [],
      classesList: [],
      token: '',
      checkSchedulings: ['ADMINISTRATOR', 'ASSISTANT', 'MANAGER', 'admin'],
      checkITSchedulings: ['IT_SUPPORT', 'admin'],
      sendScheduling: Object.assign({}, defaultSendScheduling)
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    const token_ = getToken()
    this.token = token_.split('-')[0]
    this.id = token_.split('-')[1]
    var type = 'AUTHORIZE'
    if (this.checkITSchedulings.includes(this.token)) {
      type = this.token
    }
    const data = getSchedulingByType(type)
    this.getSpaceEnable()
    this.getMasterUsers()
  },
  methods: {
    async getScheduling() {
      const res = await getScheduling()
      this.schedulingList = res.data
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
      this.spaceList = classes.data
      this.dialogType = 'new'
      this.dialogAuthorizer = true
    },
    async handleAddStudent() {
      this.scheduling = deepClone(scope.row)
      const students = await getStudents()
      this.studentsList = students.data
      const studentsScheduling = await getStudentScheduling(this.scheduling.id)
      this.studentsSchedulingList = studentsScheduling.data
      this.dialogAuthorizer = true
    },
    handleEditAuthorizer(scope) {
      this.dialogType = 'edit'
      this.dialogAuthorizer = true
      this.checkStrictly = true
      this.scheduling = deepClone(scope.row)
      this.sendScheduling = deepClone(defaulSendScheduling)
      if (this.checkSchedulings.includes(this.token)) {
        this.sendScheduling.type = 'AUTHORIZE'
      }
      if (this.checkITSchedulings.includes(this.token)) {
        this.sendScheduling.type = this.token
      }
      this.sendScheduling.user_id = this.id
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
    async confirmRole() {
      await updateScheduling(this.scheduling.id, this.sendScheduling).then(async() => {
        this.schedulingList.splice($index, 1)
        this.$message({
          type: 'success',
          message: 'Aceito com sucesso!'
        })
      })
        .catch(err => {
          console.error(err)
        })
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
