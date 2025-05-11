// src/sanity/structure.ts
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Projects grouped by type
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects by Type')
            .items([
              // Product projects
              S.listItem()
                .title('Product Projects')
                .child(
                  S.documentList()
                    .title('Product Projects')
                    .filter('_type == "project" && projectType == "product"')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              
              // Craft projects
              S.listItem()
                .title('Craft Projects')
                .child(
                  S.documentList()
                    .title('Craft Projects')
                    .filter('_type == "project" && projectType == "craft"')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              
              // All projects
              S.listItem()
                .title('All Projects')
                .child(
                  S.documentList()
                    .title('All Projects')
                    .filter('_type == "project"')
                    .defaultOrdering([{field: 'projectType', direction: 'asc'}, {field: 'order', direction: 'asc'}])
                )
            ])
        ),
    ])