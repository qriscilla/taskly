(this.webpackJsonptaskly=this.webpackJsonptaskly||[]).push([[0],{140:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(15),r=n.n(c),s=n(31),i=n(18),o=n(11),l=n(100),j=(n(131),n(141),l.a.initializeApp({apiKey:"AIzaSyApo620vYcOrtLWiPVkdZcdoq27y4z_mF0",authDomain:"planr-e21eb.firebaseapp.com",projectId:"planr-e21eb",storageBucket:"planr-e21eb.appspot.com",messagingSenderId:"161165183382",appId:"1:161165183382:web:bf2f01da6cc778b885b5b7"})),u=j.auth(),d=j.firestore(),b=n(3),O=Object(a.createContext)(),p=function(){return Object(a.useContext)(O)},m=function(e){var t=e.children,n=Object(a.useState)(),c=Object(o.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)(!0),l=Object(o.a)(i,2),j=l[0],d=l[1];Object(a.useEffect)((function(){u.onAuthStateChanged((function(e){s(e),d(!1)}))}));var p={currentUser:r,signUp:function(e,t){return u.createUserWithEmailAndPassword(e,t)},signIn:function(e,t){return u.signInWithEmailAndPassword(e,t)},signOut:function(){return u.signOut()},resetPassword:function(e){return u.sendPasswordResetEmail(e)}};return Object(b.jsx)(O.Provider,{value:p,children:!j&&t})},f=n(33),x=n(101),h=n.n(x),g=n(106),k=n.n(g),v=n(107),y=n.n(v),S=[{id:0,name:"Due today",icon:Object(b.jsx)(h.a,{})},{id:1,name:"Due within 7 days",icon:Object(b.jsx)(k.a,{})},{id:2,name:"All incomplete tasks",icon:Object(b.jsx)(y.a,{})}],D={vertical:"bottom",horizontal:"center"},w={vertical:"top",horizontal:"center"},C=Object(a.createContext)(),N=function(){return Object(a.useContext)(C)},P=function(e){var t=e.children,n=Object(a.useState)({}),c=Object(o.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)([]),l=Object(o.a)(i,2),j=l[0],u=l[1],O=p().currentUser;Object(a.useEffect)((function(){m(0)}),[]);var m=function(e){O&&(e<3?(s(S[e]),d.collection("tasks").where("userEmail","==",O.email).onSnapshot((function(t){return u(t.docs.map((function(e){return Object(f.a)({id:e.id},e.data())})).filter((function(t){var n=(new Date).setHours(0,0,0,0),a=t.dueDate.split("-"),c=new Date(a[0],a[1]-1,a[2]).setHours(0,0,0,0);switch(e){case 0:return c===n;case 1:return c>=n&&c<=n+6048e5;default:return!t.completed}})))}))):(d.collection("projects").doc(e).onSnapshot((function(e){return s(Object(f.a)({id:e.id},e.data()))})),d.collection("tasks").where("projectId","==",e).onSnapshot((function(e){return u(e.docs.map((function(e){return Object(f.a)({id:e.id},e.data())})))}))))},x={project:r,tasks:j,selectProject:m};return Object(b.jsx)(C.Provider,{value:x,children:t})},E=n(75),T=function(e){var t=e.component,n=Object(E.a)(e,["component"]),a=p().currentUser;return Object(b.jsx)(i.b,Object(f.a)(Object(f.a)({},n),{},{render:function(e){return a?Object(b.jsx)(t,Object(f.a)({},e)):Object(b.jsx)(i.a,{to:"/taskly/sign-in"})}}))},W=function(e){var t=e.component,n=Object(E.a)(e,["component"]),a=p().currentUser;return Object(b.jsx)(i.b,Object(f.a)(Object(f.a)({},n),{},{render:function(e){return a?Object(b.jsx)(i.a,{to:"/taskly"}):Object(b.jsx)(t,Object(f.a)({},e))}}))},R=n(182),F=n(183),A=n(203),z=n(188),I=n(202),M=n(187),L=n(181),B=Object(L.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},alert:{width:"100%",marginTop:e.spacing(3)},form:{width:"100%",marginTop:e.spacing(2)},submit:{margin:e.spacing(3,0,2)},link:{textDecoration:"none",color:e.palette.primary.main,"&:hover":{textDecoration:"underline"}}}})),U=n(52),q=n(71),H=n.n(q),V=Object(L.a)((function(e){return{logo:{color:e.palette.primary.main,fontWeight:"600",display:"flex",flexDirection:"column",alignItems:"center"}}})),G=function(){var e=V();return Object(b.jsxs)(U.a,{variant:"h5",className:e.logo,children:[Object(b.jsx)(H.a,{fontSize:"large"})," taskly"]})},J=function(){var e=B(),t=Object(a.useRef)(),n=Object(a.useRef)(),c=Object(a.useRef)(),r=Object(a.useState)(""),i=Object(o.a)(r,2),l=i[0],j=i[1],u=p().signUp;return Object(b.jsxs)(R.a,{component:"main",maxWidth:"xs",children:[Object(b.jsx)(F.a,{}),Object(b.jsxs)("div",{className:e.paper,children:[Object(b.jsx)(G,{}),l&&Object(b.jsx)(A.a,{severity:"error",className:e.alert,children:l}),Object(b.jsxs)("form",{className:e.form,onSubmit:function(e){e.preventDefault();var a=t.current.value,r=n.current.value;if(r!==c.current.value)return j("Passwords do not match.");j(""),u(a,r).then((function(){return d.collection("users").add({email:a})})).catch((function(e){return j(e.message)}))},children:[Object(b.jsx)(I.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Email",inputRef:t,autoComplete:"email",autoFocus:!0}),Object(b.jsx)(I.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Password",type:"password",inputRef:n}),Object(b.jsx)(I.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Password Confirmation",type:"password",inputRef:c}),Object(b.jsx)(M.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,children:"Sign up"}),Object(b.jsx)(z.a,{container:!0,justify:"flex-end",children:Object(b.jsx)(z.a,{item:!0,children:Object(b.jsx)(s.b,{to:"/taskly/sign-in",className:e.link,children:"Already have an account? Sign in"})})})]})]})]})},K=function(){var e=B(),t=Object(a.useRef)(),n=Object(a.useRef)(),c=Object(a.useState)(""),r=Object(o.a)(c,2),i=r[0],l=r[1],j=p().signIn;return Object(b.jsxs)(R.a,{component:"main",maxWidth:"xs",children:[Object(b.jsx)(F.a,{}),Object(b.jsxs)("div",{className:e.paper,children:[Object(b.jsx)(G,{}),i&&Object(b.jsx)(A.a,{severity:"error",className:e.alert,children:i}),Object(b.jsxs)("form",{className:e.form,onSubmit:function(e){e.preventDefault();var a=t.current.value,c=n.current.value;l(""),j(a,c).catch((function(e){return l(e.message)}))},children:[Object(b.jsx)(I.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Email",autoComplete:"email",autoFocus:!0,inputRef:t}),Object(b.jsx)(I.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Password",type:"password",inputRef:n,autoComplete:"current-password"}),Object(b.jsx)(M.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,children:"Sign In"}),Object(b.jsxs)(z.a,{container:!0,children:[Object(b.jsx)(z.a,{item:!0,xs:!0,children:Object(b.jsx)(s.b,{to:"/taskly/reset-password",className:e.link,children:"Forgot password?"})}),Object(b.jsx)(z.a,{item:!0,children:Object(b.jsx)(s.b,{to:"/taskly/sign-up",className:e.link,children:"Don't have an account? Sign up"})})]})]})]})]})},Y=function(){var e=B(),t=Object(a.useRef)(),n=Object(a.useState)(""),c=Object(o.a)(n,2),r=c[0],i=c[1],l=Object(a.useState)(""),j=Object(o.a)(l,2),u=j[0],d=j[1],O=p().resetPassword;return Object(b.jsxs)(R.a,{component:"main",maxWidth:"xs",children:[Object(b.jsx)(F.a,{}),Object(b.jsxs)("div",{className:e.paper,children:[Object(b.jsx)(G,{}),r&&Object(b.jsx)(A.a,{severity:"error",className:e.alert,children:r}),u&&Object(b.jsx)(A.a,{severity:"success",className:e.alert,children:u}),Object(b.jsxs)("form",{className:e.form,onSubmit:function(e){e.preventDefault();var n=t.current.value;i(""),d(""),O(n).then((function(){return d("Check your inbox for further instructions.")})).catch((function(e){return i(e.message)}))},children:[Object(b.jsx)(I.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Email",autoComplete:"email",autoFocus:!0,inputRef:t}),Object(b.jsx)(M.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,children:"Reset Password"}),Object(b.jsxs)(z.a,{container:!0,children:[Object(b.jsx)(z.a,{item:!0,xs:!0,children:Object(b.jsx)(s.b,{to:"/taskly/sign-up",className:e.link,children:"Don't have an account? Sign up"})}),Object(b.jsx)(z.a,{item:!0,children:Object(b.jsx)(s.b,{to:"/taskly/sign-in",className:e.link,children:"Sign in"})})]})]})]})]})},Z=n(190),_=n(191),Q=n(108),X=n.n(Q),$=Object(L.a)((function(){return{title:{flexGrow:1,fontWeight:600,marginLeft:15},signOutMenu:{marginRight:"-15px"}}})),ee=function(e){var t=e.openSignOutMenu,n=$();return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(H.a,{}),Object(b.jsx)(U.a,{variant:"h6",className:n.title,children:"taskly"}),Object(b.jsx)(M.a,{color:"inherit",onClick:t,className:n.signOutMenu,children:Object(b.jsx)(X.a,{})})]})},te=n(113),ne=n(189),ae=function(e){var t=e.anchorEl,n=e.closeSignOutMenu,a=p().signOut;return Object(b.jsx)(te.a,{anchorEl:t,keepMounted:!0,open:Boolean(t),onClose:n,getContentAnchorEl:null,anchorOrigin:D,transformOrigin:w,children:Object(b.jsx)(ne.a,{onClick:function(){return a().catch((function(e){return console.log(e.message)}))},children:"Sign out"})})},ce=Object(L.a)((function(e){return{appBar:{zIndex:e.zIndex.drawer+1}}})),re=function(){var e=ce(),t=Object(a.useState)(null),n=Object(o.a)(t,2),c=n[0],r=n[1];return Object(b.jsx)(Z.a,{position:"fixed",className:e.appBar,children:Object(b.jsxs)(_.a,{children:[Object(b.jsx)(ee,{openSignOutMenu:function(e){return r(e.currentTarget)}}),Object(b.jsx)(ae,{anchorEl:c,closeSignOutMenu:function(){return r(null)}})]})})},se=n(206),ie=n(199),oe=n(186),le=n(142),je=n(192),ue=n(193),de=function(){var e=N().selectProject;return Object(b.jsx)(oe.a,{children:S.map((function(t){return Object(b.jsxs)(le.a,{button:!0,onClick:function(){return e(t.id)},children:[Object(b.jsx)(je.a,{children:t.icon}),Object(b.jsx)(ue.a,{primary:t.name})]},t.id)}))})},be=n(109),Oe=n.n(be),pe=n(111),me=n.n(pe),fe=n(110),xe=n.n(fe),he=n(194),ge=n(112),ke=n.n(ge),ve=Object(L.a)((function(e){return{nested:{paddingLeft:e.spacing(4)}}})),ye=function(){var e=ve(),t=Object(a.useState)([]),n=Object(o.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!1),i=Object(o.a)(s,2),l=i[0],j=i[1],u=N().selectProject,O=p().currentUser;Object(a.useEffect)((function(){d.collection("projects").where("userEmail","==",O.email).onSnapshot((function(e){r(e.docs.map((function(e){return{id:e.id,name:e.data().name}})))}))}),[O.email]);return Object(b.jsxs)(oe.a,{children:[Object(b.jsxs)(le.a,{button:!0,onClick:function(){return j(!l)},children:[Object(b.jsx)(je.a,{children:Object(b.jsx)(Oe.a,{})}),Object(b.jsx)(ue.a,{primary:"Projects"}),l?Object(b.jsx)(xe.a,{}):Object(b.jsx)(me.a,{})]}),Object(b.jsx)(he.a,{in:l,timeout:"auto",unmountOnExit:!0,children:Object(b.jsx)(oe.a,{component:"div",disablePadding:!0,children:c.map((function(t){return Object(b.jsxs)(le.a,{button:!0,className:e.nested,onClick:function(){return u(t.id)},children:[Object(b.jsx)(je.a,{children:Object(b.jsx)(ke.a,{})}),Object(b.jsx)(ue.a,{primary:t.name})]},t.id)}))})})]})},Se=n(73),De=n.n(Se),we=n(195),Ce=n(196),Ne=n(197),Pe=n(198),Ee=Object(L.a)((function(){return{button:{fontWeight:600}}})),Te=function(e){var t=e.dialogOpen,n=e.setDialogOpen,c=e.title,r=e.action,s=e.actionLabel,i=N().project,o=Object(a.useRef)(),l=Ee();return Object(b.jsxs)(we.a,{open:t,fullWidth:!0,maxWidth:"xs",onClose:function(){return n(!1)},children:[Object(b.jsx)(Ce.a,{children:c}),Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),r(o.current.value)},children:[Object(b.jsx)(Ne.a,{children:Object(b.jsx)(I.a,{autoFocus:!0,margin:"dense",label:"Project name",type:"text",fullWidth:!0,defaultValue:"Save"===s&&i?i.name:null,inputRef:o})}),Object(b.jsxs)(Pe.a,{children:[Object(b.jsx)(M.a,{variant:"outlined",size:"small",className:l.button,color:"primary",onClick:function(){return n(!1)},children:"Cancel"}),Object(b.jsx)(M.a,{type:"submit",variant:"contained",size:"small",className:l.button,color:"primary",children:s})]})]})]})},We=n(205),Re=Object(L.a)((function(){return{snackbar:{position:"fixed",bottom:0,right:0,padding:"0 15px 15px 0"},alert:{paddingTop:1,paddingBottom:1}}})),Fe=function(e){var t=e.snackbarOpen,n=e.setSnackbarOpen,a=e.confirmMessage,c=Re();return Object(b.jsx)(We.a,{open:t,autoHideDuration:6e3,onClose:function(){return n(!1)},anchorOrigin:{vertical:"bottom",horizontal:"right"},className:c.snackbar,children:Object(b.jsx)(A.a,{onClose:function(){return n(!1)},variant:"outlined",severity:"success",className:c.alert,children:a})})},Ae=Object(L.a)((function(){return{addProject:{position:"fixed",bottom:0,paddingBottom:15},button:{fontWeight:600}}})),ze=function(){var e=Ae(),t=Object(a.useState)(!1),n=Object(o.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!1),i=Object(o.a)(s,2),l=i[0],j=i[1],u=p().currentUser,O=N().selectProject;return Object(b.jsxs)("div",{children:[Object(b.jsx)(oe.a,{children:Object(b.jsx)(le.a,{className:e.addProject,children:Object(b.jsxs)(M.a,{variant:"contained",size:"small",color:"primary",className:e.button,onClick:function(){return r(!0)},children:[Object(b.jsx)(De.a,{})," Add Project"]})})}),Object(b.jsx)(Te,{dialogOpen:c,setDialogOpen:r,title:"Add new project",action:function(e){d.collection("projects").add({name:e,userEmail:u.email}).then((function(e){r(!1),j(!0),O(e.id)})).catch((function(e){return console.log(e.message)}))},actionLabel:"Add"}),Object(b.jsx)(Fe,{snackbarOpen:l,setSnackbarOpen:j,confirmMessage:"Project was added!"})]})},Ie=Object(L.a)((function(){return{drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerContainer:{overflow:"auto"}}})),Me=function(){var e=Ie();return Object(b.jsxs)(se.a,{className:e.drawer,variant:"permanent",styles:{paper:e.drawerPaper},children:[Object(b.jsx)(_.a,{}),Object(b.jsxs)("div",{className:e.drawerContainer,children:[Object(b.jsx)(de,{}),Object(b.jsx)(ie.a,{}),Object(b.jsx)(ye,{}),Object(b.jsx)(ze,{})]})]})},Le=n(184),Be=n(74),Ue=n.n(Be),qe=function(e){var t=e.editProjectDialogOpen,n=e.setEditProjectDialogOpen,c=N().project,r=Object(a.useState)(!1),s=Object(o.a)(r,2),i=s[0],l=s[1];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Te,{dialogOpen:t,setDialogOpen:n,title:"Edit project",action:function(e){d.collection("projects").doc(c.id).update({name:e}).then((function(){n(!1),l(!0)})).catch((function(e){return console.log(e)}))},actionLabel:"Save"}),Object(b.jsx)(Fe,{snackbarOpen:i,setSnackbarOpen:l,confirmMessage:"Project was updated!"})]})},He=n(200),Ve=Object(L.a)((function(){return{button:{fontWeight:600}}})),Ge=function(e){var t=e.itemType,n=e.dialogOpen,a=e.setDialogOpen,c=e.deleteFunc,r=Ve();return Object(b.jsxs)(we.a,{maxWidth:"xs",fullWidth:!0,open:n,children:[Object(b.jsxs)(Ce.a,{children:["Delete ",t,"?"]}),Object(b.jsx)(Ne.a,{children:Object(b.jsxs)(He.a,{style:{color:"black"},children:["Please confirm your action.","task"===t?"This will permanently delete the task.":"This will permanently delete the project as well as its containing tasks."]})}),Object(b.jsxs)(Pe.a,{children:[Object(b.jsx)(M.a,{size:"small",className:r.button,variant:"outlined",color:"secondary",onClick:function(){return a(!1)},children:"Cancel"}),Object(b.jsx)(M.a,{size:"small",className:r.button,variant:"contained",color:"secondary",onClick:c(),children:"Delete"})]})]})},Je=function(e){var t=e.deleteProjectDialogOpen,n=e.setDeleteProjectDialogOpen,c=N(),r=c.project,s=c.selectProject,i=Object(a.useState)(!1),l=Object(o.a)(i,2),j=l[0],u=l[1];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Ge,{itemType:"project",dialogOpen:t,setDialogOpen:n,deleteFunc:function(){return function(e){d.collection("projects").doc(r.id).delete().then((function(){return u(!0)})),d.collection("tasks").where("projectId","==",r.id).get().then((function(e){return e.forEach((function(e){return e.ref.delete()}))})),n(!1),s(0)}}}),Object(b.jsx)(Fe,{snackbarOpen:j,setSnackbarOpen:u,confirmMessage:"Project was deleted!"})]})},Ke=function(e){var t=e.anchorEl,n=e.setAnchorEl,c=Object(a.useState)(!1),r=Object(o.a)(c,2),s=r[0],i=r[1],l=Object(a.useState)(!1),j=Object(o.a)(l,2),u=j[0],d=j[1];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(te.a,{anchorEl:t,keepMounted:!0,open:Boolean(t),onClose:function(){return n(null)},getContentAnchorEl:null,anchorOrigin:D,transformOrigin:w,children:[Object(b.jsx)(ne.a,{onClick:function(){n(!1),i(!0)},children:"Rename"}),Object(b.jsx)(ne.a,{onClick:function(){n(!1),d(!0)},children:"Delete"})]}),Object(b.jsx)(qe,{editProjectDialogOpen:s,setEditProjectDialogOpen:i}),Object(b.jsx)(Je,{deleteProjectDialogOpen:u,setDeleteProjectDialogOpen:d})]})},Ye=Object(L.a)((function(){return{datePickerLabel:{margin:"15px 0 -5px",color:"gray",fontSize:15},button:{fontWeight:600}}})),Ze=function(e){var t=e.dialogOpen,n=e.setDialogOpen,c=e.title,r=e.actionLabel,s=e.action,i=e.currTask,o=Object(a.useRef)(),l=Object(a.useRef)(),j=Ye();return Object(b.jsxs)(we.a,{maxWidth:"xs",fullWidth:!0,open:t,children:[Object(b.jsx)(Ce.a,{children:c}),Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),s(o.current.value,l.current.value)},children:[Object(b.jsxs)(Ne.a,{children:[Object(b.jsx)(I.a,{autoFocus:!0,margin:"dense",fullWidth:!0,label:"Task",type:"text",inputRef:o,defaultValue:i?i.task:null}),Object(b.jsx)("div",{className:j.datePickerLabel,children:"Due Date"}),Object(b.jsx)(I.a,{margin:"dense",fullWidth:!0,type:"date",inputRef:l,defaultValue:i?i.dueDate:null})]}),Object(b.jsxs)(Pe.a,{children:[Object(b.jsx)(M.a,{variant:"outlined",size:"small",className:j.button,onClick:function(){return n(!1)},children:"Cancel"}),Object(b.jsx)(M.a,{size:"small",className:j.button,variant:"contained",color:"primary",type:"submit",children:r})]})]})]})},_e=Object(L.a)((function(){return{projectHeader:{display:"flex",justifyContent:"space-between",fontWeight:600,marginBottom:19},button:{padding:1,margin:"0 5px"}}})),Qe=function(){var e=_e(),t=Object(a.useState)(!1),n=Object(o.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!1),i=Object(o.a)(s,2),l=i[0],j=i[1],u=N().project,O=p().currentUser;return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Le.a,{className:e.button,color:"primary",onClick:function(){return r(!0)},children:Object(b.jsx)(De.a,{})}),Object(b.jsx)(Ze,{dialogOpen:c,setDialogOpen:r,title:"Add new task",actionLabel:"Add",action:function(e,t){d.collection("tasks").add({task:e,completed:!1,projectId:u.id,dueDate:t,userEmail:O.email}).then((function(){r(!1),j(!0)})).catch((function(e){return console.log(e.message)}))},currTask:null}),Object(b.jsx)(Fe,{snackbarOpen:l,setSnackbarOpen:j,confirmMessage:"Task was added!"})]})},Xe=Object(L.a)((function(){return{projectHeader:{display:"flex",justifyContent:"space-between",fontWeight:600,marginBottom:19},button:{padding:1,margin:"0 5px"}}})),$e=function(){var e=Xe(),t=N().project,n=Object(a.useState)(null),c=Object(o.a)(n,2),r=c[0],s=c[1];return Object(b.jsxs)(U.a,{variant:"h6",className:e.projectHeader,children:[t&&t.name,Object(b.jsxs)("span",{children:["string"===typeof t.id&&Object(b.jsxs)("span",{children:[Object(b.jsx)(Qe,{}),Object(b.jsx)(Le.a,{className:e.button,color:"primary",onClick:function(e){return s(e.currentTarget)},children:Object(b.jsx)(Ue.a,{})})]}),Object(b.jsx)(Ke,{anchorEl:r,setAnchorEl:s})]})]})},et=n(201),tt=n(204),nt=function(e){var t,n=e.task;return Object(b.jsx)(et.a,{control:Object(b.jsx)(tt.a,{checked:n.completed,size:"small",color:"primary",onChange:(t=n.id,function(e){d.collection("tasks").doc(t).update({completed:e.target.checked})})})})},at=function(e){var t=e.editTaskDialogOpen,n=e.setEditTaskDialogOpen,c=e.currTask,r=Object(a.useState)(!1),s=Object(o.a)(r,2),i=s[0],l=s[1];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Ze,{dialogOpen:t,setDialogOpen:n,title:"Edit task",actionLabel:"Save",action:function(e,t){d.collection("tasks").doc(c.id).update({task:e,dueDate:t}).then((function(){n(!1),l(!0)}))},currTask:c}),Object(b.jsx)(Fe,{snackbarOpen:i,setSnackbarOpen:l,confirmMessage:"Task was updated!"})]})},ct=function(e){var t=e.deleteTaskDialogOpen,n=e.setDeleteTaskDialogOpen,c=e.currTask,r=Object(a.useState)(!1),s=Object(o.a)(r,2),i=s[0],l=s[1];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Ge,{itemType:"task",dialogOpen:t,setDialogOpen:n,deleteFunc:function(){return function(e){d.collection("tasks").doc(c.id).delete().then((function(){n(!1),l(!0)}))}}}),Object(b.jsx)(Fe,{snackbarOpen:i,setSnackbarOpen:l,confirmMessage:"Task was deleted!"})]})},rt=function(e){var t=e.anchorEl,n=e.setAnchorEl,c=e.currTask,r=Object(a.useState)(!1),s=Object(o.a)(r,2),i=s[0],l=s[1],j=Object(a.useState)(!1),u=Object(o.a)(j,2),d=u[0],O=u[1];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(te.a,{anchorEl:t,keepMounted:!0,open:Boolean(t),onClose:function(){return n(null)},getContentAnchorEl:null,anchorOrigin:D,transformOrigin:w,children:[Object(b.jsx)(ne.a,{onClick:function(){n(!1),l(!0)},children:"Edit"}),Object(b.jsx)(ne.a,{onClick:function(){n(!1),O(!0)},children:"Delete"})]}),Object(b.jsx)(at,{editTaskDialogOpen:i,setEditTaskDialogOpen:l,currTask:c}),Object(b.jsx)(ct,{deleteTaskDialogOpen:d,setDeleteTaskDialogOpen:O,currTask:c})]})},st=Object(L.a)((function(e){return{tasks:{display:"flex",flexDirection:"column"},task:{display:"flex",justifyContent:"space-between"},elipses:{color:"black",width:10,height:10,marginRight:6},dueDate:{backgroundColor:"rgba(25, 118, 210, 0.2)",color:e.palette.primary.main,fontSize:13,fontWeight:600,borderRadius:10,padding:"5px 10px",marginRight:10}}})),it=function(){var e=st(),t=Object(a.useState)(null),n=Object(o.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)({}),i=Object(o.a)(s,2),l=i[0],j=i[1],u=N().tasks,d=function(e){return function(t){j(e),r(t.currentTarget)}};return Object(b.jsxs)("div",{children:[Object(b.jsx)(U.a,{className:e.tasks,children:u.map((function(t){return Object(b.jsxs)("span",{className:e.task,children:[Object(b.jsxs)("span",{children:[Object(b.jsx)(nt,{task:t}),t.task]}),Object(b.jsxs)("span",{children:[Object(b.jsx)("span",{className:e.dueDate,children:t.dueDate}),Object(b.jsx)(Le.a,{className:e.elipses,onClick:d(t),children:Object(b.jsx)(Ue.a,{})})]})]},t.id)}))}),Object(b.jsx)(ie.a,{}),Object(b.jsx)(rt,{anchorEl:c,setAnchorEl:r,currTask:l})]})},ot=Object(L.a)((function(){return{main:{flexGrow:1,padding:18}}})),lt=function(){var e=ot();return Object(b.jsxs)("main",{className:e.main,children:[Object(b.jsx)(_.a,{}),Object(b.jsx)($e,{}),Object(b.jsx)(it,{})]})},jt=function(){return Object(b.jsxs)("div",{style:{display:"flex"},children:[Object(b.jsx)(F.a,{}),Object(b.jsx)(re,{}),Object(b.jsx)(Me,{}),Object(b.jsx)(lt,{})]})},ut=function(){return Object(b.jsx)(s.a,{children:Object(b.jsx)(m,{children:Object(b.jsxs)(i.d,{children:[Object(b.jsx)(W,{path:"/taskly/sign-up",component:J}),Object(b.jsx)(W,{path:"/taskly/sign-in",component:K}),Object(b.jsx)(W,{path:"/taskly/reset-password",component:Y}),Object(b.jsx)(P,{children:Object(b.jsx)(T,{exact:!0,path:"/taskly",component:jt})})]})})})},dt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,207)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};r.a.render(Object(b.jsx)(ut,{}),document.getElementById("root")),dt()}},[[140,1,2]]]);
//# sourceMappingURL=main.34c6da24.chunk.js.map