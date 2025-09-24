void init_free_list(void *mem, size_t mem_size) {
    // Initialize the freelist (list_head is assumed to be defined in this scope)
    list_head = (common_header_t *)mem;
    list_head->size = (int)(mem_size - sizeof(common_header_t));
    list_head->next = NULL;
}
