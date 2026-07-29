import{Q as e,a as t,g as n,i as r,l as i,o as a,r as o,s,tt as c,u as l}from"./app-store-D6bMLqet.js";import{t as u}from"./borrowers._borrowerId-VAY9fHBK.js";import{i as d,t as f}from"./app-shell-DdqJwSTw.js";import{t as p}from"./arrow-left-BoECzKg3.js";var m=c(e()),h=n();function g(){let{borrowerId:e}=u.useParams();l();let{borrowers:n,loans:c,payDue:g,updateBorrower:x,notifySuccess:S,notifyError:C}=s(),w=n.find(t=>t.id===e),[T,E]=(0,m.useState)(null),[D,O]=(0,m.useState)(!1),[k,A]=(0,m.useState)(!1),[j,M]=(0,m.useState)(a(new Date)),[N,P]=(0,m.useState)(`Admin`),[F,I]=(0,m.useState)(null),[L,R]=(0,m.useState)({name:``,fatherName:``,mobile:``,mobile2:``,work:``,address:``});if((0,m.useEffect)(()=>{w&&R({name:w.name,fatherName:w.fatherName,mobile:w.mobile,mobile2:w.mobile2??``,work:w.work,address:w.address??``})},[w]),!w)return(0,h.jsx)(f,{title:`Borrower not found`,children:(0,h.jsx)(`div`,{className:`mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-20 text-center`,children:(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`p`,{className:`text-lg font-bold text-foreground`,children:`Borrower not found`}),(0,h.jsx)(`p`,{className:`mt-3 text-sm text-muted-foreground`,children:`The selected borrower could not be found. Please go back and try a different record.`}),(0,h.jsx)(i,{to:`/borrowers`,className:`mt-6 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground`,children:`Back to borrowers`})]})})});let z=c.filter(e=>e.borrowerId===w.id),B=z.reduce((e,n)=>{let r=t(n);return e.total+=r.total,e.paid+=r.paid,e.pending+=r.pending,e.balance+=r.balance,e},{total:0,paid:0,pending:0,balance:0}),V=(0,m.useMemo)(()=>z.flatMap(e=>e.dues.map(t=>({loan:e,due:t}))).filter(({due:e})=>!e.paid).sort((e,t)=>o(e.due.date).getTime()-o(t.due.date).getTime())[0],[z]);async function H(e,t){try{E(t),await g(e,t,a(new Date),`Admin`),S(`Payment successfully recorded.`)}catch(e){console.error(e),C(`Unable to record payment. Please try again.`)}finally{E(null)}}let U=[`Admin`,`Agent 1`,`Agent 2`];async function W(){if(w){if(!L.name||!L.fatherName||!L.mobile||!L.work||!L.address){C(`Please fill all required borrower fields.`);return}try{await x(w.id,{name:L.name,fatherName:L.fatherName,mobile:L.mobile,mobile2:L.mobile2,work:L.work,address:L.address}),O(!1),S(`Borrower details updated.`)}catch(e){console.error(e),C(`Unable to save borrower details.`)}}}async function G(){if(V)try{E(V.due.no),await g(V.loan.id,V.due.no,j,N||`Admin`),A(!1),I({loanCode:V.loan.code,due:{...V.due,paid:!0,paidDate:j,collectedBy:N||`Admin`}}),S(`Payment collected successfully.`)}catch(e){console.error(e),C(`Unable to collect payment. Please try again.`)}finally{E(null)}}function K(){let e=window.open(``,`Borrower Report`,`width=800,height=1000`);if(!e)return;let n=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Borrower Report</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
          .header h1 { font-size: 24px; margin-bottom: 5px; }
          .header .date { font-size: 12px; color: #666; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 14px; font-weight: bold; background: #f0f0f0; padding: 8px; margin-bottom: 10px; border-left: 4px solid #2563eb; }
          .field-row { display: grid; grid-template-columns: 1fr 2fr; margin-bottom: 8px; font-size: 13px; }
          .field-label { font-weight: bold; color: #555; }
          .field-value { color: #000; }
          .loan-row { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap: 10px; padding: 8px; border-bottom: 1px solid #ddd; font-size: 12px; }
          .loan-header { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap: 10px; padding: 8px; background: #f0f0f0; font-weight: bold; font-size: 12px; border-bottom: 2px solid #000; }
          .summary { background: #f9f9f9; padding: 12px; border-left: 4px solid #2563eb; }
          .summary-row { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 6px; font-size: 13px; }
          .summary-label { font-weight: bold; }
          .summary-value { text-align: right; }
          .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #ddd; padding-top: 15px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Borrower Report</h1>
          <div class="date">Generated on ${new Date().toLocaleString()}</div>
        </div>

        <div class="section">
          <div class="section-title">Personal Information</div>
          <div class="field-row">
            <div class="field-label">Name</div>
            <div class="field-value">${w.name}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Father's Name</div>
            <div class="field-value">${w.fatherName}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Mobile</div>
            <div class="field-value">${w.mobile}</div>
          </div>
          ${w.mobile2?`
          <div class="field-row">
            <div class="field-label">Alternate Mobile</div>
            <div class="field-value">${w.mobile2}</div>
          </div>`:``}
          <div class="field-row">
            <div class="field-label">Occupation</div>
            <div class="field-value">${w.work}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Address</div>
            <div class="field-value">${w.address||`—`}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Account Summary</div>
          <div class="summary">
            <div class="summary-row">
              <div class="summary-label">Total Taken</div>
              <div class="summary-value">₹${B.total.toLocaleString()}</div>
            </div>
            <div class="summary-row">
              <div class="summary-label">Total Paid</div>
              <div class="summary-value">₹${B.paid.toLocaleString()}</div>
            </div>
            <div class="summary-row">
              <div class="summary-label">Pending Due</div>
              <div class="summary-value">₹${B.pending.toLocaleString()}</div>
            </div>
            <div class="summary-row">
              <div class="summary-label">Outstanding Balance</div>
              <div class="summary-value">₹${B.balance.toLocaleString()}</div>
            </div>
          </div>
        </div>

        ${z.length>0?`
        <div class="section">
          <div class="section-title">Loan Details</div>
          <div class="loan-header">
            <div>Loan Code</div>
            <div>Frequency</div>
            <div>Total Amount</div>
            <div>Paid</div>
            <div>Balance</div>
          </div>
          ${z.map(e=>{let n=t(e);return`
            <div class="loan-row">
              <div>${e.code}</div>
              <div>${e.frequency}</div>
              <div>₹${n.total.toLocaleString()}</div>
              <div>₹${n.paid.toLocaleString()}</div>
              <div>₹${n.balance.toLocaleString()}</div>
            </div>`}).join(``)}
        </div>`:``}

        <div class="footer">
          <p>This is a computer-generated report. For official records, please retain the printed copy.</p>
        </div>

        <script>
          window.print();
        <\/script>
      </body>
      </html>
    `;e.document.write(n),e.document.close()}return(0,h.jsxs)(f,{title:`Borrower Details`,reportCallback:K,headerLeft:(0,h.jsx)(`button`,{onClick:()=>window.history.back(),className:`rounded-md p-2 text-brand transition hover:bg-slate-100`,children:(0,h.jsx)(p,{className:`size-6`})}),children:[(0,h.jsxs)(`div`,{className:`mx-4 space-y-6 py-4`,children:[(0,h.jsxs)(`div`,{className:`rounded-3xl border border-border bg-card p-5 shadow-sm`,children:[(0,h.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-4`,children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`p`,{className:`text-xl font-bold text-foreground`,children:w.name}),(0,h.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:w.work})]}),(0,h.jsx)(`div`,{className:`flex gap-2`,children:(0,h.jsx)(`button`,{type:`button`,onClick:()=>O(e=>!e),className:`rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-slate-50`,children:D?`Cancel`:`Edit borrower`})})]}),D?(0,h.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),W()},className:`mt-5 space-y-4`,children:[(0,h.jsx)(d,{label:`Name`,required:!0,children:(0,h.jsx)(`input`,{className:`field-input`,value:L.name,onChange:e=>R(t=>({...t,name:e.target.value}))})}),(0,h.jsx)(d,{label:`Father name`,required:!0,children:(0,h.jsx)(`input`,{className:`field-input`,value:L.fatherName,onChange:e=>R(t=>({...t,fatherName:e.target.value}))})}),(0,h.jsx)(d,{label:`Mobile`,required:!0,children:(0,h.jsx)(`input`,{className:`field-input`,value:L.mobile,onChange:e=>R(t=>({...t,mobile:e.target.value}))})}),(0,h.jsx)(d,{label:`Alt mobile`,children:(0,h.jsx)(`input`,{className:`field-input`,value:L.mobile2,onChange:e=>R(t=>({...t,mobile2:e.target.value}))})}),(0,h.jsx)(d,{label:`Shop / Work`,required:!0,children:(0,h.jsx)(`input`,{className:`field-input`,value:L.work,onChange:e=>R(t=>({...t,work:e.target.value}))})}),(0,h.jsx)(d,{label:`Address`,required:!0,children:(0,h.jsx)(`input`,{className:`field-input`,value:L.address,onChange:e=>R(t=>({...t,address:e.target.value}))})}),(0,h.jsx)(`button`,{type:`submit`,className:`rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground`,children:`Save borrower`})]}):(0,h.jsxs)(`div`,{className:`mt-5 grid gap-3 sm:grid-cols-2`,children:[(0,h.jsx)(v,{label:`Mobile`,value:w.mobile}),(0,h.jsx)(v,{label:`Alternate mobile`,value:w.mobile2??`—`}),(0,h.jsx)(v,{label:`Father name`,value:w.fatherName}),(0,h.jsx)(v,{label:`Address`,value:w.address??`—`})]})]}),(0,h.jsxs)(`div`,{className:`grid gap-3 sm:grid-cols-4`,children:[(0,h.jsx)(y,{label:`Total taken`,value:r(B.total)}),(0,h.jsx)(y,{label:`Total paid`,value:r(B.paid)}),(0,h.jsx)(y,{label:`Pending due`,value:r(B.pending)}),(0,h.jsx)(y,{label:`Outstanding`,value:r(B.balance)})]}),(0,h.jsxs)(`div`,{className:`rounded-3xl border border-border bg-card p-5 shadow-sm`,children:[(0,h.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3`,children:[(0,h.jsx)(`p`,{className:`text-base font-bold text-primary`,children:`Loan history`}),(0,h.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[V?(0,h.jsxs)(`div`,{className:`rounded-2xl bg-brand/5 px-4 py-2 text-sm font-semibold text-brand`,children:[`Next due: `,V.due.date,` • `,V.loan.code]}):(0,h.jsx)(`div`,{className:`rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700`,children:`All dues paid`}),V?(0,h.jsx)(`button`,{type:`button`,onClick:()=>A(!0),className:`rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90`,children:`Collect payment`}):null]})]}),z.length===0?(0,h.jsx)(`p`,{className:`mt-4 text-sm text-muted-foreground`,children:`No loans found for this borrower.`}):(0,h.jsx)(`ul`,{className:`mt-4 space-y-3`,children:z.map(e=>{let n=t(e);return(0,h.jsxs)(`li`,{className:`rounded-2xl border border-border p-4`,children:[(0,h.jsxs)(`div`,{className:`flex flex-wrap items-start justify-between gap-4`,children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`p`,{className:`text-base font-semibold text-foreground`,children:e.code}),(0,h.jsxs)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:[e.frequency,` loan • `,e.dues.length,` installments`]})]}),(0,h.jsx)(`span`,{className:`rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand`,children:e.perInstallment?`EMI ${r(e.perInstallment)}`:`EMI —`})]}),(0,h.jsxs)(`div`,{className:`mt-4 grid gap-2 sm:grid-cols-4 text-sm text-muted-foreground`,children:[(0,h.jsx)(b,{label:`Total`,value:r(n.total)}),(0,h.jsx)(b,{label:`Paid`,value:r(n.paid)}),(0,h.jsx)(b,{label:`Pending`,value:r(n.pending)}),(0,h.jsx)(b,{label:`Balance`,value:r(n.balance)})]}),(0,h.jsxs)(`div`,{className:`mt-5 rounded-2xl border border-border bg-background p-4`,children:[(0,h.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`p`,{className:`text-sm font-semibold text-foreground`,children:`Loan schedule`}),(0,h.jsxs)(`p`,{className:`text-xs text-muted-foreground`,children:[`Paid and upcoming installments for `,e.code]})]}),(0,h.jsxs)(`span`,{className:`rounded-full bg-muted/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground`,children:[e.dues.filter(e=>e.paid).length,`/`,e.dues.length,` paid`]})]}),(0,h.jsx)(`div`,{className:`mt-4 space-y-3`,children:e.dues.map(t=>(0,h.jsxs)(`div`,{className:`flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between`,children:[(0,h.jsxs)(`div`,{children:[(0,h.jsxs)(`p`,{className:`text-sm font-semibold text-foreground`,children:[`Installment `,t.no]}),(0,h.jsxs)(`p`,{className:`text-xs text-muted-foreground`,children:[`Due date: `,t.date]}),(0,h.jsx)(`p`,{className:`mt-1 text-xs font-medium text-foreground`,children:t.paid?`Paid`:`Unpaid`})]}),(0,h.jsxs)(`div`,{className:`flex flex-col items-start gap-2 sm:items-end`,children:[(0,h.jsx)(`p`,{className:`text-sm font-semibold text-foreground`,children:r(t.amount)}),(0,h.jsxs)(`div`,{className:`flex items-center gap-2`,children:[t.paid?(0,h.jsx)(`span`,{className:`rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700`,children:`Paid`}):(0,h.jsx)(`span`,{className:`rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700`,children:`Unpaid`}),t.paid?null:(0,h.jsx)(`button`,{type:`button`,onClick:()=>H(e.id,t.no),disabled:T===t.no,className:`inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-brand/40`,children:T===t.no?`Saving...`:`Collect payment`})]})]})]},`${e.id}-${t.no}`))})]})]},e.id)})})]})]}),k&&V?(0,h.jsxs)(_,{onClose:()=>A(!1),children:[(0,h.jsx)(`h2`,{className:`mb-6 text-center text-2xl font-bold`,children:`Collect payment`}),(0,h.jsxs)(`div`,{className:`space-y-6`,children:[(0,h.jsx)(d,{label:`Borrower`,children:(0,h.jsx)(`input`,{className:`field-input`,readOnly:!0,value:w.name})}),(0,h.jsx)(d,{label:`Loan code`,children:(0,h.jsx)(`input`,{className:`field-input`,readOnly:!0,value:V.loan.code})}),(0,h.jsx)(d,{label:`Due installment`,children:(0,h.jsx)(`input`,{className:`field-input`,readOnly:!0,value:V.due.no})}),(0,h.jsx)(d,{label:`Due date`,children:(0,h.jsx)(`input`,{className:`field-input`,readOnly:!0,value:V.due.date})}),(0,h.jsx)(d,{label:`Amount`,children:(0,h.jsx)(`input`,{className:`field-input`,readOnly:!0,value:r(V.due.amount)})}),(0,h.jsx)(d,{label:`Paid date`,children:(0,h.jsx)(`input`,{className:`field-input`,value:j,onChange:e=>M(e.target.value)})}),(0,h.jsx)(d,{label:`Collected by`,children:(0,h.jsx)(`select`,{className:`field-input`,value:N,onChange:e=>P(e.target.value),children:U.map(e=>(0,h.jsx)(`option`,{value:e,children:e},e))})})]}),(0,h.jsxs)(`div`,{className:`mt-6 flex gap-4`,children:[(0,h.jsx)(`button`,{type:`button`,onClick:()=>A(!1),className:`flex-1 rounded-md border border-border py-4 text-base font-bold tracking-wide text-foreground`,children:`Close`}),(0,h.jsx)(`button`,{type:`button`,onClick:G,className:`flex-1 rounded-md bg-brand py-4 text-base font-bold tracking-wide text-brand-foreground`,children:`Collect payment`})]})]}):null,F?(0,h.jsxs)(_,{onClose:()=>I(null),children:[(0,h.jsxs)(`div`,{className:`flex flex-col items-center gap-4 pt-2`,children:[(0,h.jsx)(`div`,{className:`flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-700`,children:`✓`}),(0,h.jsx)(`h2`,{className:`text-center text-2xl font-bold`,children:`Payment collected`}),(0,h.jsxs)(`p`,{className:`text-center text-sm text-muted-foreground`,children:[F.loanCode,` installment `,F.due.no,` has been marked paid.`]})]}),(0,h.jsxs)(`div`,{className:`mt-6 grid gap-3 text-sm text-muted-foreground`,children:[(0,h.jsxs)(`div`,{className:`grid grid-cols-2 gap-2`,children:[(0,h.jsx)(`span`,{children:`Borrower`}),(0,h.jsx)(`span`,{children:w.name})]}),(0,h.jsxs)(`div`,{className:`grid grid-cols-2 gap-2`,children:[(0,h.jsx)(`span`,{children:`Amount`}),(0,h.jsx)(`span`,{children:r(F.due.amount)})]}),(0,h.jsxs)(`div`,{className:`grid grid-cols-2 gap-2`,children:[(0,h.jsx)(`span`,{children:`Paid date`}),(0,h.jsx)(`span`,{children:F.due.paidDate})]}),(0,h.jsxs)(`div`,{className:`grid grid-cols-2 gap-2`,children:[(0,h.jsx)(`span`,{children:`Collected by`}),(0,h.jsx)(`span`,{children:F.due.collectedBy})]})]}),(0,h.jsxs)(`div`,{className:`mt-6 grid gap-3 sm:grid-cols-2`,children:[(0,h.jsx)(`button`,{type:`button`,onClick:()=>{let e=`
                  <html>
                  <head>
                    <title>Payment Receipt</title>
                    <style>
                      body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
                      h1 { font-size: 24px; margin-bottom: 12px; }
                      .field { margin-bottom: 10px; }
                      .label { color: #555; font-size: 0.9rem; margin-bottom: 4px; }
                      .value { font-size: 1.1rem; font-weight: 700; }
                      .badge { display: inline-flex; padding: 6px 10px; border-radius: 999px; background: #def7ec; color: #064e3b; margin-top: 8px; }
                    </style>
                  </head>
                  <body>
                    <h1>Payment Receipt</h1>
                    <div class="field"><div class="label">Loan</div><div class="value">${F.loanCode}</div></div>
                    <div class="field"><div class="label">Borrower</div><div class="value">${w.name}</div></div>
                    <div class="field"><div class="label">Installment</div><div class="value">Due ${F.due.no}</div></div>
                    <div class="field"><div class="label">Due date</div><div class="value">${F.due.date}</div></div>
                    <div class="field"><div class="label">Paid date</div><div class="value">${F.due.paidDate}</div></div>
                    <div class="field"><div class="label">Collected by</div><div class="value">${F.due.collectedBy}</div></div>
                    <div class="field"><div class="label">Amount</div><div class="value">${r(F.due.amount)}</div></div>
                    <div class="badge">Thank you for your payment</div>
                    <script>window.print();<\/script>
                  </body>
                  </html>
                `,t=window.open(``,`Payment Receipt`,`width=600,height=800`);t&&(t.document.write(e),t.document.close())},className:`rounded-md bg-emerald-600 px-4 py-4 text-sm font-medium text-emerald-foreground`,children:`Print receipt`}),(0,h.jsx)(`button`,{type:`button`,onClick:()=>I(null),className:`rounded-md bg-brand px-4 py-4 text-sm font-medium text-brand-foreground`,children:`Close`})]})]}):null]})}function _({children:e,onClose:t}){return(0,h.jsxs)(`div`,{className:`fixed inset-0 z-40 flex items-center justify-center bg-foreground/50 p-4`,children:[(0,h.jsx)(`div`,{className:`absolute inset-0`,onClick:t}),(0,h.jsx)(`div`,{className:`relative z-10 max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-xl bg-card p-5 shadow-xl`,children:e})]})}function v({label:e,value:t}){return(0,h.jsxs)(`div`,{className:`rounded-2xl border border-border bg-background p-4`,children:[(0,h.jsx)(`p`,{className:`text-xs uppercase tracking-[0.2em] text-muted-foreground`,children:e}),(0,h.jsx)(`p`,{className:`mt-2 text-base font-semibold text-foreground`,children:t})]})}function y({label:e,value:t}){return(0,h.jsxs)(`div`,{className:`rounded-2xl border border-border bg-background p-4 text-center`,children:[(0,h.jsx)(`p`,{className:`text-xs uppercase tracking-[0.2em] text-muted-foreground`,children:e}),(0,h.jsx)(`p`,{className:`mt-2 text-lg font-bold text-foreground`,children:t})]})}function b({label:e,value:t}){return(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`p`,{className:`text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground`,children:e}),(0,h.jsx)(`p`,{className:`mt-1 font-semibold text-foreground`,children:t})]})}export{g as component};