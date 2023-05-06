export default {
            "Application":{
            uid:"api::application.application",
            tableName:"applications"
         },
    "JbIndustry":{
            uid:"api::jb-industry.jb-industry",
            tableName:"jb_industries"
         },
    "JbPerson":{
            uid:"api::jb-person.jb-person",
            tableName:"jb_people"
         },
    "JbResume":{
            uid:"api::jb-resume.jb-resume",
            tableName:"jb_resumes"
         },
    "JbTalent":{
            uid:"api::jb-talent.jb-talent",
            tableName:"jb_talents"
         },
    "JbWork":{
            uid:"api::jb-work.jb-work",
            tableName:"jb_works"
         },
    "JbWorkUser":{
            uid:"api::jb-work-user.jb-work-user",
            tableName:"jb_work_users"
         },
    "ScCategory":{
            uid:"api::sc-category.sc-category",
            tableName:"sc_categories"
         },
    "ScFactory":{
            uid:"api::sc-factory.sc-factory",
            tableName:"sc_factories"
         },
    "ScNew":{
            uid:"api::sc-new.sc-new",
            tableName:"sc_news"
         },
    "ScTrial":{
            uid:"api::sc-trial.sc-trial",
            tableName:"sc_trials"
         },
    "YmAction":{
            uid:"api::ym-action.ym-action",
            tableName:"ym_actions"
         },
    "YmDicOption":{
            uid:"api::ym-dic-option.ym-dic-option",
            tableName:"ym_dic_options"
         },
    "YmFactory":{
            uid:"api::ym-factory.ym-factory",
            tableName:"ym_factories"
         },
    "YmLog":{
            uid:"api::ym-log.ym-log",
            tableName:"ym_logs"
         },
    "YmNew":{
            uid:"api::ym-new.ym-new",
            tableName:"ym_news"
         },
    "YmPage":{
            uid:"api::ym-page.ym-page",
            tableName:"ym_pages"
         },
    "YmRolePermission":{
            uid:"api::ym-role-permission.ym-role-permission",
            tableName:"ym_role_permissions"
         },

   }
export interface Application {
	id:number,
	application:string,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface JbIndustry {
	id:number,
	name:string,
	parentId:number,
	type:any,
	level:number,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface JbPerson {
	id:number,
	name:string,
	address:string,
	phone:string,
	users_permissions_user:any,
	jb_work_users:JbWorkUser[],
	age:number,
	sex:any,
	email:any,
	educational:string,
	place:string,
	education:string,
	jb_resumes:JbResume[],
	image:any,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface JbResume {
	id:number,
	name:string,
	age:number,
	sex:any,
	phone:string,
	email:any,
	huntingStatus:any,
	city:string,
	salary:any,
	huntingType:string,
	position:string,
	advantage:any,
	experienceJingli:any,
	education:any,
	experienceJingyan:any,
	jb_person:JbPerson,
	address:string,
	place:string,
	political:string,
	duration:number,
	jb_work_users:JbWorkUser[],
	industry:string,
	skill:any,
	time:string,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface JbTalent {
	id:number,
	name:string,
	salary:any,
	position:string,
	experience:string,
	learn:string,
	more:any,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface JbWork {
	id:number,
	name:string,
	experience:string,
	learn:string,
	address:string,
	welfare:string,
	sc_factory:ScFactory,
	users_permissions_users:any[],
	details:any,
	status:any,
	jb_work_users:JbWorkUser[],
	salaryMax:number,
	salaryMin:number,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface JbWorkUser {
	id:number,
	jb_work:JbWork,
	jb_person:JbPerson,
	isheshi:any,
	ismianshi:any,
	isyimianshi:any,
	ishege:any,
	jb_resumes:JbResume[],
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface ScCategory {
	id:number,
	name:string,
	code:string,
	path:string,
	layer:number,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface ScFactory {
	id:number,
	name:string,
	nameJc:string,
	type:string,
	isCheck:string,
	introduce:any,
	environment:any,
	employee:any,
	product:any,
	information:any,
	address:string,
	gps:string,
	jb_works:JbWork[],
	users_permissions_users:any[],
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface ScNew {
	id:number,
	context:any,
	title:string,
	author:string,
	imageTitle:any,
	type:string,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface ScTrial {
	id:number,
	name:string,
	phone:string,
	email:any,
	company:string,
	product:string,
	type:string,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface YmAction {
	id:number,
	name:string,
	code:string,
	ym_page:YmPage,
	ym_role_permissions:YmRolePermission[],
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface YmDicOption {
	id:number,
	name:string,
	value:string,
	sort:number,
	statue:any,
	title:string,
	dataType:any,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface YmFactory {
	id:number,
	name:string,
	address:string,
	billCode:string,
	billLicense:string,
	phone:string,
	statue:any,
	licensePicId:number,
	authorization:number,
	users_permissions_users:any[],
	type:string,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface YmLog {
	id:number,
	titile:string,
	type:string,
	yuanContext:any,
	xinContext:any,
	operator:string,
	time:Date,
	operatorId:number,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface YmNew {
	id:number,
	context:any,
	title:string,
	author:string,
	imageTitle:any,
	type:string,
	createdAt:Date,
	updatedAt:Date,
	publishedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface YmPage {
	id:number,
	title:string,
	to:string,
	ym_actions:YmAction[],
	ym_role_permissions:YmRolePermission[],
	icon:string,
	parentId:number,
	name:string,
	index:number,
	caidan:any,
	component:string,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}
export interface YmRolePermission {
	id:number,
	roleName:any,
	ym_page:YmPage,
	ym_action:YmAction,
	createdAt:Date,
	updatedAt:Date,
	createdBy:any,
	updatedBy:any,

}