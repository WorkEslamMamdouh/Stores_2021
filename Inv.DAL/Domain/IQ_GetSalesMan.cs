//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inv.DAL.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class IQ_GetSalesMan
    {
        public int SalesmanId { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<int> BraCode { get; set; }
        public string SalesmanCode { get; set; }
        public string NameA { get; set; }
        public string NameE { get; set; }
        public string ShortNameA { get; set; }
        public string ShortNameE { get; set; }
        public string ADDRESS { get; set; }
        public string IDNo { get; set; }
        public string MOBILE { get; set; }
        public string EMAIL { get; set; }
        public Nullable<bool> Isactive { get; set; }
        public string REMARKS { get; set; }
        public string CREATED_BY { get; set; }
        public Nullable<System.DateTime> CREATED_AT { get; set; }
        public Nullable<System.DateTime> UPDATED_AT { get; set; }
        public string UPDATED_BY { get; set; }
        public string GLAccCode { get; set; }
        public Nullable<bool> IsSalesEnable { get; set; }
        public Nullable<bool> IsPurchaseEnable { get; set; }
        public Nullable<bool> ISOperationEnable { get; set; }
        public Nullable<decimal> PurchaseLimit { get; set; }
        public Nullable<decimal> SalesCreditLimit { get; set; }
        public Nullable<int> NationalityID { get; set; }
        public string NationalityCode { get; set; }
        public string Nat_DescA { get; set; }
        public string Nat_DescE { get; set; }
        public string CC_Code { get; set; }
        public string CC_DESCA { get; set; }
        public string CC_DESCE { get; set; }
    }
}
