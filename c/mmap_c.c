// Total heap size reserved with mmap (example: 2 MB)
#define MEM_SIZE (2 * 1024 * 1024)

void *get_mem_block(void *addr, size_t mem_size) {
    void *h_ptr = mmap(
        addr,                   // starting address hint (NULL lets kernel choose)
        mem_size,               // number of bytes requested
        PROT_READ | PROT_WRITE, // memory should be readable and writable
        MAP_PRIVATE | MAP_ANONYMOUS, // private mapping, not backed by a file
        -1,                     // no file descriptor needed
        0                       // offset must be zero for MAP_ANONYMOUS
    );

    if (h_ptr == MAP_FAILED) {
        return NULL;            // return NULL if mmap fails
    }
    return h_ptr;               // otherwise return the allocated memory
}

// Example usage:
void *mem = get_mem_block(NULL, MEM_SIZE);
