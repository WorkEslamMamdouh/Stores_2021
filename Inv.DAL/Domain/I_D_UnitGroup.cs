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
    
    public partial class I_D_UnitGroup
    {
        public int UnitGrpID { get; set; }
        public string UnitGrpCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> UomID { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
    }
}
