<template>
    <div class="page-container">
        <PageNavTab/>
        <div class="inner-container">
            <PageTitle/>
            <el-form :inline="true" form-inline class="common-form-inline">
                <el-form-item label="时间范围" class="">
                    <TimePicker/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"><i class="fa fa-search"></i>查询</el-button>
                </el-form-item>
                <el-form-item>
                    <!--弹出窗item-->
                    <el-popover
                            width="1000"
                            trigger="click">
                        <el-form label-width="80px">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="手机号">
                                        <el-input placeholder="请输入手机号" v-model="s_phone"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="用户名">
                                        <el-input placeholder="请输入用户名" v-model="s_name"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="楼名">
                                        <el-cascader
                                                v-model="buildSelect"
                                                :options="buildoptions"
                                                :props="cascaderprop"
                                                collapse-tags
                                                clearable></el-cascader>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="是否认证">
                                        <el-select v-model="s_is_auth" placeholder="请选择">
                                            <el-option key="0" label="未认证" value="0"/>
                                            <el-option key="1" label="已认证" value="1"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-button slot="reference" type="warning"><i class="fa fa-caret-square-o-up"></i>更多</el-button>
                    </el-popover>
                </el-form-item>
            </el-form>
            <el-row class="common-table-tools">
                <el-col :span="18">
                    <el-button type="success" size="small" plain @click.native="addItem"><i class="fa fa-plus"></i>新增
                    </el-button>
                    <el-button type="primary" size="small" plain @click.native="updateItem"><i class="fa fa-edit"></i>修改
                    </el-button>
                    <el-button type="danger" size="small" plain @click.native="deleteItem"><i class="fa fa-trash"></i>删除
                    </el-button>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入关键字" size="small"/>
                </el-col>
            </el-row>
            <el-table
                    @select-all="tableSelect"
                    @select="tableSelect"
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total="total">
            </el-pagination>
            <el-dialog :title="operate=='add'?'新增用户':'修改用户'" :visible.sync="dialogFormVisible">
                <el-form>
                    <el-form-item label="活动名称">
                        <el-input autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import PageTitle from '@/components/PageTitle.vue';
    import PageNavTab from '@/components/PageNavTab.vue';
    import TimePicker from '@/components/TimePicker.vue';

    export default {
        components: {
            PageTitle,
            PageNavTab,
            TimePicker
        },
        data() {
            return {
                /**
                 * table
                 * **/
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    tag: '家'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333,
                    tag: '公司'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    tag: '家'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333,
                    tag: '公司'
                }],
                t_select: [],
                /**
                 * checbox多选
                 * **/
                buildSelect: [],
                cascaderprop: {multiple: true},
                buildoptions: [],
                /**
                 * 查询框model
                 */
                s_builds: [],
                s_is_auth: '',
                s_name: '',
                s_phone: '',
                /**
                 * page
                 */
                total: 0,
                pageSize:10,
                currentPage:1,
                /**
                 * dialog
                 */
                dialogFormVisible: false,
                operate: 'add',//add 新增用户;update 修改用户
                /**
                 * notification
                 */
            }
        },
        methods: {
            addItem() {
                this.operate = 'add';
                this.dialogFormVisible = true
            },
            updateItem() {
                if (this.t_select.length > 1 || this.t_select.length === 0) {
                    this.$message({
                        message: '请选择一个选项进行修改',
                        type: 'warning',
                        offset: 200,
                        showClose: true
                    });
                    return;
                }
                //传入值
                this.operate = 'update';
                this.dialogFormVisible = true
            },
            deleteItem() {
                if (this.t_select.length === 0) {
                    this.$message({
                        message: '请选择一个选项进行删除',
                        type: 'warning',
                        offset: 200,
                        showClose: true
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        offset: 200,
                        showClose: true
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        offset: 200,
                        showClose: true
                    });
                });
            },
            //table选中checkbox
            tableSelect(selection, row) {
                this.t_select = selection;
                console.log(selection, row)
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>
