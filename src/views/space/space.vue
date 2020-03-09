<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddSpace">
      {{ $t('space.addSpace') }}
    </el-button>

    <el-table :data="spaceList" style="width: 100%;margin-top:30px;" border max-height="250">

      <el-table-column label="Nome do Espaço" align="center" fixed>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Espaço: {{ scope.row.name }}</p>
            <p v-if="scope.row.project == 1 || scope.row.project == '1' || scope.row.project == 'Possui'">Possui Projetor: Possui</p>
            <p v-if="scope.row.project == 0 || scope.row.project == '0' || scope.row.project == 'Não Possui'">Possui Projetor: Não Possui</p>
            <p v-if="scope.row.smartBoard == 1 || scope.row.smartBoard == '1' || scope.row.smartBoard == 'Possui'">Possui Quadro Inteligente: Possui</p>
            <p v-if="scope.row.smartBoard == 0 || scope.row.smartBoard == '0' || scope.row.smartBoard == 'Não Possui'">Possui Quadro Inteligente: Não Possui</p>
            <p v-if="scope.row.board == 1 || scope.row.board == '1' || scope.row.board == 'Possui'">Possui Quadro: Possui</p>
            <p v-if="scope.row.board == 0 || scope.row.board == '0' || scope.row.board == 'Não Possui'">Possui Quadro: Não Possui</p>

            <p v-if="scope.row.type == 'ROOM' || scope.row.type == 'Sala'">Quantidade de cadeiras: {{ scope.row.numberChair }}</p>
            <p v-if="space.type == 'LAB' || space.type == 'Laboratorio'">Quantidade de computadores: {{ scope.row.numberPc }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.name }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="Status" align="center" fixed>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Espaço: {{ scope.row.name }}</p>
            <p v-if="scope.row.project == 1 || scope.row.project == '1' || scope.row.project == 'Possui'">Possui Projetor: Possui</p>
            <p v-if="scope.row.project == 0 || scope.row.project == '0' || scope.row.project == 'Não Possui'">Possui Projetor: Não Possui</p>
            <p v-if="scope.row.smartBoard == 1 || scope.row.smartBoard == '1' || scope.row.smartBoard == 'Possui'">Possui Quadro Inteligente: Possui</p>
            <p v-if="scope.row.smartBoard == 0 || scope.row.smartBoard == '0' || scope.row.smartBoard == 'Não Possui'">Possui Quadro Inteligente: Não Possui</p>
            <p v-if="scope.row.board == 1 || scope.row.board == '1' || scope.row.board == 'Possui'">Possui Quadro: Possui</p>
            <p v-if="scope.row.board == 0 || scope.row.board == '0' || scope.row.board == 'Não Possui'">Possui Quadro: Não Possui</p>

            <p v-if="scope.row.type == 'ROOM' || scope.row.type == 'Sala'">Quantidade de cadeiras: {{ scope.row.numberChair }}</p>
            <p v-if="space.type == 'LAB' || space.type == 'Laboratorio'">Quantidade de cadeiras: {{ scope.row.numberPc }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.status }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="Tipo" align="center" fixed>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Espaço: {{ scope.row.name }}</p>
            <p v-if="scope.row.project == 1 || scope.row.project == '1' || scope.row.project == 'Possui'">Possui Projetor: Possui</p>
            <p v-if="scope.row.project == 0 || scope.row.project == '0' || scope.row.project == 'Não Possui'">Possui Projetor: Não Possui</p>
            <p v-if="scope.row.smartBoard == 1 || scope.row.smartBoard == '1' || scope.row.smartBoard == 'Possui'">Possui Quadro Inteligente: Possui</p>
            <p v-if="scope.row.smartBoard == 0 || scope.row.smartBoard == '0' || scope.row.smartBoard == 'Não Possui'">Possui Quadro Inteligente: Não Possui</p>
            <p v-if="scope.row.board == 1 || scope.row.board == '1' || scope.row.board == 'Possui'">Possui Quadro: Possui</p>
            <p v-if="scope.row.board == 0 || scope.row.board == '0' || scope.row.board == 'Não Possui'">Possui Quadro: Não Possui</p>

            <p v-if="scope.row.type == 'ROOM' || scope.row.type == 'Sala'">Quantidade de cadeiras: {{ scope.row.numberChair }}</p>
            <p v-if="space.type == 'LAB' || space.type == 'Laboratorio'">Quantidade de cadeiras: {{ scope.row.numberPc }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.type }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" :data="spaceList" label="Operações" fixed>
        <template slot-scope="scope">
          <el-button v-if="scope.row.type == 'Laboratorio' || space.type == 'LAB'" type="primary" size="small" @click="handleSoftwares(scope)">
            {{ $t('space.softwares') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('space.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('space.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Espaço':'Novo Espaço'">
      <el-form ref="space" :model="space" :rules="spaceRules" label-width="80px" label-position="left" :data="spaceList">
        <el-form-item label="Nome" prop="name">
          <el-input v-model="space.name" placeholder="Space Name" />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="space.status">
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tipo" prop="type">
          <el-select v-model="space.type">
            <el-option value="ROOM" label="Sala" selected>Sala</el-option>
            <el-option value="LAB" label="Lab">Laboratório</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="space.type == 'ROOM' || space.type == 'Sala'" label="Número de cadeiras">
          <el-input-number v-model="space.numberChair" :min="1" placeholder="Número de cadeira" />
        </el-form-item>
        <el-form-item v-if="space.type == 'LAB' || space.type == 'Laboratorio'" label="Número de Computadores">
          <el-input-number v-model="space.numberPc" :min="1" placeholder="Número de Computadores" />
        </el-form-item>
        <el-form-item label="Projetor" prop="project">
          <el-select v-model="space.project">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Quadro Inteligente" prop="smartBoard">
          <el-select v-model="space.smartBoard">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Quadro" prop="board">
          <el-select v-model="space.board">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('space.cancel') }}
        </el-button>
        <el-button type="primary" :loading="loading" @click.native.prevent="confirmRole">
          {{ $t('space.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogSoftware" :title="title_software" align="center">
      <el-form :model="software" label-width="80px" label-position="left">
        <el-table :data="softwareSpaceList" style="width: 100%;margin-top:30px;" border>
          <el-table-column label="Softwares Adicionados" align="center">
            <el-table-column align="center" label="Software">
              <template slot-scope="softwareSpaceScopeList">
                {{ softwareSpaceScopeList.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" :data="softwareSpaceList" label="Operações">
              <template slot-scope="softwareSpaceScope">
                <el-button type="danger" size="small" @click="handleDeleteSoftware(softwareSpaceScope)">
                  {{ $t('space.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <el-table :data="softwareList" style="width: 100%;margin-top:30px;" border>
          <el-table-column label="Softwares a Adicionar" align="center">
            <el-table-column align="center" label="Space Name">
              <template slot-scope="softwareScope">
                {{ softwareScope.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" :data="softwareList" label="Operations">
              <template slot-scope="softwareScope">
                <el-button type="submit" size="small" @click="handleAddSoftwareSpace(softwareScope)">
                  {{ $t('software.addSoftwareSpace') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

      </el-form>
      <div style="text-align:right; margin-top: 10px">
        <el-button type="danger" @click="dialogSoftware=false">
          {{ $t('space.cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getSpace, addSpace, deleteSpace, updateSpace } from '@/api/space'
import { getSoftwareSpace, getActiveSoftware, deleteSoftwareSpace, addSoftwareSpace } from '@/api/software'

const defaultSpace = {
  id: '',
  name: '',
  status: '',
  type: '',
  numberPc: '',
  numberChair: '',
  project: '',
  smartBoard: '',
  board: ''
}

const defaultSoftware = {
  id: '',
  name: '',
  status: ''
}

const types = {
  ROOM: 'Sala',
  LAB: 'Laboratorio'
}

const sendTypes = {
  'Sala': 'ROOM',
  'Laboratorio': 'LAB'
}

const status = {
  1: 'Ativo',
  0: 'Inativo'
}

const sendStatus = {
  'Ativo': 1,
  'Inativo': 0
}

const ownType = {
  1: 'Possui',
  0: 'Não Possui'
}

const sendOwnType = {
  'Possui': 1,
  'Não Possui': 0
}

export default {
  data() {
    const validateEmpty = (rule, value, callback) => {
      if (!value) {
        callback(new Error('O campo não pode ser vazio.'))
      } else {
        if (this.checkIfNameExists(value, this.space.id)) {
          callback(new Error('Já existe um espaço cadastrado com esse nome.'))
        } else {
          callback()
        }
      }
    }
    const validateType = (rule, value, callback) => {
      if (this.typesList[value] || this.sendTypesList[value]) {
        callback()
      } else {
        callback(new Error('Selecione um tipo válido.'))
      }
    }
    const validateStatus = (rule, value, callback) => {
      var statusValidate = [1, 0, '1', '0', 'Ativo', 'Inativo']
      if (statusValidate.includes(value)) {
        callback()
      } else {
        callback(new Error('Selecione um status válido.'))
      }
    }
    const validateOwnType = (rule, value, callback) => {
      var ownTypeValidate = [1, 0, '1', '0', 'Possui', 'Não Possui']
      console.log(value + ' ' + ownTypeValidate.includes(value))
      if (ownTypeValidate.includes(value)) {
        callback()
      } else {
        callback(new Error('Selecione uma opção válida.'))
      }
    }
    return {
      loading: false,
      space: Object.assign({}, defaultSpace),
      software: Object.assign({}, defaultSoftware),
      dialogVisible: false,
      dialogSoftware: false,
      dialogType: 'new',
      checkStrictly: false,
      spaceList: [],
      softwareSpaceList: [],
      softwareList: [],
      title_software: '',
      typesList: Object.assign({}, types),
      sendStatusList: Object.assign({}, sendStatus),
      sendTypesList: Object.assign({}, sendTypes),
      statusList: Object.assign({}, status),
      ownTypesList: Object.assign({}, ownType),
      sendOwnTypeList: Object.assign({}, sendOwnType),
      spaceRules: {
        type: [{ required: true, trigger: 'blur', validator: validateType }],
        status: [{ required: true, trigger: 'blur', validator: validateStatus }],
        name: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        project: [{ required: true, trigger: 'blur', validator: validateOwnType }],
        smartBoard: [{ required: true, trigger: 'blur', validator: validateOwnType }],
        board: [{ required: true, trigger: 'blur', validator: validateOwnType }]
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
    this.getSpace()
  },
  methods: {
    closeDialog() {
      this.$refs.space.resetFields()
      this.dialogVisible = false
    },
    async getSpace() {
      const res = await getSpace()
      this.spaceList = this.changeType(res.data)
    },
    async handleSoftwares(scope) {
      this.space = deepClone(scope.row)
      const res = await getSoftwareSpace(this.space.id)
      this.softwareSpaceList = res.data

      const response = await getActiveSoftware()
      for (let indexResponse = 0; indexResponse < response.data.length; indexResponse++) {
        console.log(response.data[indexResponse])
        for (let indexSoftware = 0; indexSoftware < this.softwareSpaceList.length; indexSoftware++) {
          console.log(this.softwareSpaceList[indexSoftware].id == response.data[indexResponse].id)
          if (this.softwareSpaceList[indexSoftware].id == response.data[indexResponse].id) {
            response.data.splice(indexResponse, 1)
          }
        }
      }
      this.softwareList = response.data
      this.title_software = 'Adicionando software no espaço ' + this.space.name
      this.dialogSoftware = true
    },
    handleaddSpace() {
      this.space = Object.assign({}, defaultSpace)
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
      this.space = deepClone(scope.row)
    },
    enableDisable(scope, status) {
      this.dialogType = 'edit'
      this.space = deepClone(scope.row)
      this.space.status = status
      this.confirmRole()
    },
    handleDelete({ $index, row }) {
      this.$confirm('Deseja remover o espaço?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteSpace(row.id)
          this.spaceList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Removido com sucesso!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleDeleteSoftware({ $index, row }) {
      this.$confirm('Deseja remover o software do espaço?', 'Warning', {
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      })
        .then(async() => {
          await deleteSoftwareSpace(row.id, this.space.id)
          this.softwareList.push(row)
          this.softwareSpaceList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Removido com sucesso.!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    confirmRole() {
      this.$refs.space.validate(valid => {
        const isEdit = this.dialogType === 'edit'
        if (valid) {
          this.loading = true
          if (isEdit) {
            new Promise((resolve, reject) => {
              updateSpace(this.space.id, this.changeSendType(this.space)).then(response => {
                for (let index = 0; index < this.spaceList.length; index++) {
                  if (this.spaceList[index].id === this.space.id) {
                    this.spaceList.splice(index, 1, Object.assign({}, this.changeType(this.space)))
                  }
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          } else {
            new Promise((resolve, reject) => {
              addSpace(this.changeSendType(this.space)).then(response => {
                const { data } = response
                this.space.id = data.key
                this.spaceList.push(this.changeType(this.space))
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }

          this.loading = false
          const { name } = this.software
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `<div>Espaço: ${name}</div>`,
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    },
    async handleAddSoftwareSpace({ $index, row }) {
      const { data } = await addSoftwareSpace({ softwareId: row.id, spaceId: this.space.id })
      this.softwareList.splice($index, 1)
      this.softwareSpaceList.push(row)
      const { name } = row
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Software Adicionado: ${name}</div>
          `,
        type: 'success'
      })
    },
    changeType(spaces) {
      if (Array.isArray(spaces)) {
        for (let index = 0; index < spaces.length; index++) {
          if (this.typesList[spaces[index].type]) {
            spaces[index].type = this.typesList[spaces[index].type]
          }
          if (this.statusList[spaces[index].status]) {
            spaces[index].status = this.statusList[spaces[index].status]
          }
          if (this.ownTypesList[spaces[index].project]) {
            spaces[index].project = this.ownTypesList[spaces[index].project]
          }
          if (this.ownTypesList[spaces[index].smartBoard]) {
            spaces[index].smartBoard = this.ownTypesList[spaces[index].smartBoard]
          }
          if (this.ownTypesList[spaces[index].board]) {
            spaces[index].board = this.ownTypesList[spaces[index].board]
          }
        }
        return spaces
      }
      if (this.typesList[spaces.type]) {
        spaces.type = this.typesList[spaces.type]
      }
      if (this.statusList[spaces.status]) {
        spaces.status = this.statusList[spaces.status]
      }
      if (this.ownTypesList[spaces.project]) {
        spaces.project = this.ownTypesList[spaces.project]
      }
      if (this.ownTypesList[spaces.smartBoard]) {
        spaces.smartBoard = this.ownTypesList[spaces.smartBoard]
      }
      if (this.ownTypesList[spaces.board]) {
        spaces.board = this.ownTypesList[spaces.board]
      }
      return spaces
    },
    changeSendType(space) {
      if (this.sendTypesList[space.type]) {
        space.type = this.sendTypesList[space.type]
      }
      if (this.sendStatusList[space.status] || space.status == 'Inativo') {
        space.status = this.sendStatusList[space.status]
      }
      if (this.sendOwnTypeList[space.project] || space.project == 'Não Possui') {
        space.project = this.sendOwnTypeList[space.project]
      }
      if (this.sendOwnTypeList[space.smartBoard] || space.smartBoard == 'Não Possui') {
        space.smartBoard = this.sendOwnTypeList[space.smartBoard]
      }
      if (this.sendOwnTypeList[space.board] || space.board == 'Não Possui') {
        space.board = this.sendOwnTypeList[space.board]
      }
      return space
    },
    checkIfNameExists(name, space_id) {
      for (let index = 0; index < this.spaceList.length; index++) {
        // eslint-disable-next-line eqeqeq
        if (this.spaceList[index].name == name && this.spaceList[index].id != space_id) {
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
