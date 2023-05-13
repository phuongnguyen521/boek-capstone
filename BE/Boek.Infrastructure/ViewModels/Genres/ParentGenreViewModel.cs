﻿using Boek.Infrastructure.Attributes;

namespace Boek.Infrastructure.ViewModels.Genres
{
    public class ParentGenreViewModel
    {
        [Int]
        public int? Id { get; set; }
        [Int]
        public int? ParentId { get; set; }
        [String]
        public string Name { get; set; }
        [Int]
        public int? DisplayIndex { get; set; }
        [Boolean]
        public bool? Status { get; set; }
        public string StatusName { get; set; }
        public List<ChildGenreViewModel> Genres { get; set; }
    }
}
