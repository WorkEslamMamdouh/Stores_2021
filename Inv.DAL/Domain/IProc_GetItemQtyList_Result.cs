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
    
    public partial class IProc_GetItemQtyList_Result
    {
        public int ItemID { get; set; }
        public string ItemCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public string TechDescA { get; set; }
        public string TechDescL { get; set; }
        public Nullable<int> UomID { get; set; }
        public Nullable<int> UnitGrpID { get; set; }
        public Nullable<int> ItemFamilyID { get; set; }
        public string OldItemCode { get; set; }
        public string RefItemCode { get; set; }
        public string VndItemCode { get; set; }
        public string BarCode1 { get; set; }
        public string BarCode2 { get; set; }
        public Nullable<System.DateTime> FirstEntryDate { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> FirstYear { get; set; }
        public string FamilyCode { get; set; }
        public string fm_DescA { get; set; }
        public string fm_DescE { get; set; }
        public string CatCode { get; set; }
        public string cat_DescA { get; set; }
        public string Cat_DescE { get; set; }
        public string UnitGrpCode { get; set; }
        public string ug_DescA { get; set; }
        public string ug_DescE { get; set; }
        public string UomCode { get; set; }
        public string uom_DescA { get; set; }
        public string Uom_DescE { get; set; }
        public int CatID { get; set; }
        public Nullable<decimal> CompQty { get; set; }
        public Nullable<decimal> BranchQty { get; set; }
        public Nullable<decimal> StoreQty { get; set; }
        public Nullable<decimal> StarGlobalCost { get; set; }
        public Nullable<decimal> GlobalCost { get; set; }
        public Nullable<int> FinYear { get; set; }
    }
}