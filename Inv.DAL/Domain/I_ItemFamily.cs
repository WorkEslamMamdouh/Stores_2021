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
    
    public partial class I_ItemFamily
    {
        public int ItemFamilyID { get; set; }
        public string FamilyCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public string TechDescA { get; set; }
        public string TechDescL { get; set; }
        public Nullable<int> CatID { get; set; }
        public Nullable<int> ItemTypeID { get; set; }
        public string RefItemCode { get; set; }
        public string BarCode1 { get; set; }
        public Nullable<System.DateTime> FirstEntryDate { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> StarGlobalCost { get; set; }
        public Nullable<decimal> GlobalCost { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> LastBarCodeSeq { get; set; }
        public string BarCodePrefix { get; set; }
    }
}
