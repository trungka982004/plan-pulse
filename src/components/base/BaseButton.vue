<script setup>

const props = defineProps({
    variant: {
        type:String,
        default: 'primary',

    },
    type: {
        type: String,
        default: 'button',
    }
})

const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
    danger: 'bg-red-500 dark:bg-rose-600 text-white hover:bg-red-600 dark:hover:bg-rose-700 shadow-sm',
    modify: 'bg-yellow-500 dark:bg-amber-500 text-white hover:bg-yellow-600 dark:hover:bg-amber-600 shadow-sm'
}
</script>

<template>
    <button
    :type="type"
    class="px-5 py-3 rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center justify-center gap-2 tracking-tight disabled:opacity-50 disabled:pointer-events-none"
    :class="variantClasses[variant]"
    >
        <slot />
    </button>
</template>