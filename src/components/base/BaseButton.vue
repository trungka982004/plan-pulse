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
    primary: 'bg-sky-600 dark:bg-sky-500 text-white hover:bg-sky-700 dark:hover:bg-sky-600 focus:ring-sky-500 dark:focus:ring-sky-400',
    danger: 'bg-red-500 dark:bg-rose-600 text-white hover:bg-red-600 dark:hover:bg-rose-700 focus:ring-red-500 dark:focus:ring-rose-500',
    modify: 'bg-yellow-500 dark:bg-amber-500 text-white hover:bg-yellow-600 dark:hover:bg-amber-600 focus:ring-yellow-500 dark:focus:ring-amber-500'
}
</script>

<template>
    <button
    :type="type"
    class="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center justify-center gap-2"
    :class="variantClasses[variant]"
    >
        <slot />
    </button>

</template>